import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTopUsers = async () => {
  try {
    const response = await api.get('/users/top');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

export const getPosts = async (type = 'latest') => {
  try {
    const response = await api.get(`/posts?type=${type}`);
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}; 