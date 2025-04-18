import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Box,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { Comment } from '@mui/icons-material';
import { getPosts } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts('latest');
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch latest posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    // Refresh data every 30 seconds for real-time updates
    const interval = setInterval(fetchPosts, 30000);
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
        Latest Posts
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Real-time feed of the newest posts
      </Typography>
      <Stack spacing={2}>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
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
        ))}
      </Stack>
    </Box>
  );
};

export default Feed; 