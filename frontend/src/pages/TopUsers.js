import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { getTopUsers } from '../services/api';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getTopUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch top users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // Refresh data every minute
    const interval = setInterval(fetchUsers, 60000);
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
        Top Users
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Users with the most commented posts
      </Typography>
      <List>
        {users.map((user, index) => (
          <React.Fragment key={user.userId}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: index === 0 ? 'primary.main' : 'secondary.main' }}>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    {index + 1}. {user.username}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography component="span" variant="body2" color="text.primary">
                      Total Comments: {user.totalComments}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      Posts: {user.postsCount}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < users.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TopUsers; 