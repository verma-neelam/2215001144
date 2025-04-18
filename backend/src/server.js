const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication credentials
const AUTH_CONFIG = {
  email: "neelam.verma_cs22@gmail.com",
  name: "neelam verma",
  rollNo: "221500144",
  accessCode: "CNneGT",
  clientId: "95b71081-ed46-4634-89f2-1e5951db948a",
  clientSecret: "BGPwPPrEUEhxurPf"
};


// Base URL for the evaluation service
const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Token management
let authToken = null;
let tokenExpiry = 0;

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL
});

// Add request interceptor to handle authentication
api.interceptors.request.use(async (config) => {
  // Check if we need to refresh the token
  if (!authToken || Date.now() >= tokenExpiry) {
    try {
      const response = await axios.post(`${BASE_URL}/auth`, {
        email: AUTH_CONFIG.email,
        name: AUTH_CONFIG.name,
        rollNo: AUTH_CONFIG.rollNo,
        accessCode: AUTH_CONFIG.accessCode,
        clientId: AUTH_CONFIG.clientID,
        clientSecret: AUTH_CONFIG.clientSecret
      });

      authToken = response.data.access_token;
      tokenExpiry = response.data.expires_in * 1000 + Date.now();
    } catch (error) {
      console.error('Error refreshing auth token:', error);
      throw error;
    }
  }

  // Add the token to the request header
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

// Cache for storing post comments count
let postsCache = new Map();
let userPostsCountCache = new Map();
let lastUpdateTime = Date.now();
const CACHE_TTL = 60000; // 1 minute cache TTL

// Helper function to get comments count for a post
async function getCommentsCount(postId) {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data.comments.length;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return 0;
  }
}

// Endpoint to get top 5 users with most commented posts
app.get('/api/users/top', async (req, res) => {
  try {

    console.log("top users");
    // Refresh cache if expired
    if (Date.now() - lastUpdateTime > CACHE_TTL) {
      const usersResponse = await api.get('/users');
      const users = usersResponse.data.users;
      
      // Reset cache
      userPostsCountCache.clear();
      
      // Get posts and comments for each user
      for (const [userId, username] of Object.entries(users)) {
        const postsResponse = await api.get(`/users/${userId}/posts`);

        console.log(postsResponse);

        const posts = postsResponse.data.posts;
        
        let totalComments = 0;
        for (const post of posts) {
          const commentsCount = await getCommentsCount(post.id);
          totalComments += commentsCount;
        }
        
        userPostsCountCache.set(userId, {
          username,
          totalComments,
          postsCount: posts.length
        });
      }
      
      lastUpdateTime = Date.now();
    }
    
    // Sort users by total comments and get top 5
    const topUsers = Array.from(userPostsCountCache.entries())
      .sort(([, a], [, b]) => b.totalComments - a.totalComments)
      .slice(0, 5)
      .map(([userId, data]) => ({
        userId,
        username: data.username,
        totalComments: data.totalComments,
        postsCount: data.postsCount
      }));
    
    res.json({ users: topUsers });
  } catch (error) {
    console.error('Error fetching top users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get posts (latest/popular)
app.get('/api/posts', async (req, res) => {
  try {
    const { type = 'latest' } = req.query;
    
    // Get all users first
    const usersResponse = await api.get('/users');
    const users = usersResponse.data.users;
    
    // Collect all posts
    let allPosts = [];
    for (const userId of Object.keys(users)) {
      const postsResponse = await api.get(`/users/${userId}/posts`);
      const userPosts = postsResponse.data.posts.map(post => ({
        ...post,
        username: users[userId]
      }));
      allPosts = [...allPosts, ...userPosts];
    }
    
    // Get comments count for each post
    for (const post of allPosts) {
      if (!postsCache.has(post.id)) {
        const commentsCount = await getCommentsCount(post.id);
        postsCache.set(post.id, {
          commentsCount,
          timestamp: Date.now()
        });
      }
      post.commentsCount = postsCache.get(post.id).commentsCount;
    }
    
    // Sort based on type
    if (type === 'popular') {
      allPosts.sort((a, b) => b.commentsCount - a.commentsCount);
    } else {
      // Sort by post ID (assuming higher ID means newer post)
      allPosts.sort((a, b) => b.id - a.id);
    }
    
    // Return all posts for popular type, but only latest 5 for 'latest' type
    const posts = type === 'popular' ? allPosts : allPosts.slice(0, 5);
    
    res.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 