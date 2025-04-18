# Average Calculator API

A RESTful API service that calculates the average of numbers.

## API Endpoints

### Calculate Average
- **URL**: `/api/average`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "numbers": [1, 2, 3, 4, 5]
  }
  ```
- **Success Response**:
  ```json
  {
    "result": 3,
    "timestamp": "2024-02-18T10:30:00Z"
  }
  ```
- **Error Response**:
  ```json
  {
    "error": "Invalid input. Please provide an array of numbers.",
    "timestamp": "2024-02-18T10:30:00Z"
  }
  ```

## Implementation Details
`
### Features
- Input validation for array of numbers
- Error handling for invalid inputs
- Performance optimization for large arrays
- Response time tracking
- Clean code architecture

### Tech Stack
- Node.js
- Express.js
- JavaScript

### Performance
- O(n) time complexity for average calculation
- Efficient memory usage
- Quick response times

## Testing
Screenshots of API tests using Insomnia are available in the `/screenshots` directory, showing:
- Request body
- Response data
- Response time
- Different test cases (success/error scenarios)

## Setup and Running

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. For development with auto-reload:
```bash
npm run dev
```

## Code Structure
```
src/
├── server.js          # Main server file
├── routes/            # API routes
├── controllers/       # Business logic
├── middleware/        # Request processing
└── utils/            # Helper functions
```

## Error Handling
- Invalid input validation
- Array type checking
- Empty array handling
- Non-numeric value handling

## Best Practices
- RESTful API design
- Proper HTTP status codes
- Comprehensive error messages
- Clean code structure
- Performance optimization
- Detailed documentation 