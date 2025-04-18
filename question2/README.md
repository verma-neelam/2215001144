# Social Media Analytics Application

A full-stack application that provides real-time analytics for social media data.

## Features

### Frontend
1. Real-time Feed
   - Latest posts displayed in real-time
   - Auto-refresh every 30 seconds
   - Responsive layout for all devices

2. Trending Posts
   - Posts with highest comment counts
   - Grid layout for better visibility
   - Real-time comment count updates

3. Top Users
   - Users with most commented posts
   - Total comments and post counts
   - Auto-updates every minute

### Backend
1. API Endpoints
   - `/api/posts?type=latest` - Get latest posts
   - `/api/posts?type=popular` - Get trending posts
   - `/api/users/top` - Get top users

2. Performance Features
   - Efficient caching mechanism
   - Optimized data structures
   - Rate limiting
   - Error handling

## Tech Stack

### Frontend
- React
- Material UI
- React Router
- Axios for API calls

### Backend
- Node.js
- Express.js
- Axios for external API calls
- CORS for cross-origin support

## Architecture

### Data Flow
```
Frontend <-> Backend API <-> External Social Media API
```

### Caching Strategy
- In-memory cache for posts
- Cache invalidation after 60 seconds
- Separate caches for posts and user data

## Setup and Installation

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Screenshots
Available in `/screenshots` directory:
- Desktop view of all pages
- Mobile responsive views
- Real-time updates demonstration

## Performance Optimizations
1. Frontend
   - Efficient re-rendering
   - Debounced API calls
   - Proper error boundaries
   - Loading states

2. Backend
   - Data caching
   - Request batching
   - Efficient sorting algorithms
   - Memory optimization

## Code Structure
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main page components
│   ├── services/      # API service layer
│   └── utils/         # Helper functions
└── public/           # Static assets

backend/
├── src/
│   ├── server.js     # Main server file
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── utils/        # Helper functions
```

## Best Practices
- Clean code architecture
- Proper error handling
- Responsive design
- Performance optimization
- Real-time data handling
- Production-ready setup 