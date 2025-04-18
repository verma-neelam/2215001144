# 221500144

This repository contains solutions for the evaluation tasks.

## Repository Structure

```
221500144/
├── question1/              # Average Calculator API
│   ├── src/               # Source code
│   ├── screenshots/       # API test screenshots
│   └── README.md          # Documentation for Question 1
└── question2/             # Social Media Analytics
    ├── backend/          # Backend API service
    ├── frontend/         # React frontend application
    ├── screenshots/      # Application screenshots
    └── README.md         # Documentation for Question 2
```

## Question 1: Average Calculator API

A RESTful API service that calculates averages. Built with Express.js.

### Features
- Calculates average of numbers
- Input validation
- Error handling
- Performance optimized

### API Documentation
- Detailed API documentation available in question1/README.md

## Question 2: Social Media Analytics

A full-stack application that provides real-time analytics for social media data.

### Features
- Real-time feed of latest posts
- Trending posts based on comment count
- Top users analytics
- Responsive design for mobile and desktop
- Efficient data caching
- Real-time updates

### Tech Stack
- Frontend: React with Material UI
- Backend: Node.js with Express
- State Management: React Hooks
- Styling: Material UI components

### Performance Optimizations
- Client-side caching
- Efficient data structures for analytics
- Optimized API calls
- Real-time updates with minimal overhead

## Development Guidelines

1. Installation and Setup
```bash
# Clone the repository
git clone <repository-url>

# For Question 1
cd question1
npm install
npm start

# For Question 2
# Backend setup
cd question2/backend
npm install
npm run dev

# Frontend setup
cd question2/frontend
npm install
npm start
```

2. Environment Variables
- Create .env files in respective directories
- Never commit sensitive information

3. Code Style
- ESLint configuration for consistent code style
- Proper code documentation
- Meaningful commit messages
- Clean and maintainable code structure

## Testing
- API testing using Insomnia/Postman
- Screenshots available in respective directories
- Test coverage for critical functionality

## Production Deployment
- Build optimization configured
- Environment-specific configurations
- Performance monitoring setup

## Additional Notes
- Node modules are git ignored
- Regular commits at logical milestones
- Production-grade coding standards followed
- Comprehensive error handling implemented 