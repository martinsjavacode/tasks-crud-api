### Real simple Tasks CRUD REST API with JWT Authentication

Stack used:

- Node.js
- Express
- MongoDB

## Installation

1 - Clone this repo

2 - Install the dependencies:

```
yarn
```

3 - Set environment variables:

Create a .env file in the root directory of the project and add the following variables:

```
PORT=your-app-port
MONGO_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

4 - Run the server:

```
    yarn dev
    OR
    yarn start
```

## Available endpoints

```
 POST    /auth/register         Sign up a new user
 POST    /auth/login            Sign in an existing user
 GET     /auth/user             Get current user data
 GET     /tasks                 Get all tasks
 POST    /tasks                 Create a new task
 PUT     /tasks/:id/complete    Complete a specific task
 PUT     /tasks/:id/uncomplete  Uncomplete a specific task
 DELETE  /tasks/:id             Delete a specific task
```

## Authentication

To access the endpoints with authentication required, you need to provide a valid JWT in the request header:

```
Authorization: Bearer your-jwt-token
```
