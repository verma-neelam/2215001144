import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Comment } from '@mui/icons-material';
import { getPosts } from '../services/api';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts('popular');
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trending posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    // Refresh data every minute
    const interval = setInterval(fetchPosts, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Posts with the most comments
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {post.username[0].toUpperCase()}
                  </Avatar>
                }
                title={post.username}
                subheader={`Post ID: ${post.id}`}
              />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {post.content}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Comment color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {post.commentsCount} comments
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingPosts; 