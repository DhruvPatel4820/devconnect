# DevConnect

A full-stack social media platform built with the **MERN stack** that allows users to create and manage posts, interact with other users, follow profiles, share images, save posts, and receive notifications.

DevConnect uses a modular **client-server architecture** with React.js on the frontend and Node.js, Express.js, and MongoDB on the backend.

---

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* HTTP-only cookie-based authentication
* Protected routes
* Public and protected route handling
* Role-based authorization
* Secure password hashing using bcrypt
* Authentication middleware
* Form validation

### Posts

* Create posts with text and images
* Edit posts
* Delete posts
* View individual posts
* Feed-based post display
* Like and unlike posts
* Save posts for later
* Image preview and viewing

### Comments

* Add comments to posts
* View comments
* Delete comments
* Interactive comment modal
* Comment management through REST APIs

### User Profiles

* View user profiles
* Edit profile information
* Upload profile images
* View user's posts
* Follow and unfollow users
* Display user information and posts

### Social Features

* Follow and unfollow system
* User suggestions
* Search users and posts
* Saved posts
* Notifications
* Social feed
* Responsive social media interface

### Media Management

* Image upload using Multer
* Cloudinary integration for cloud-based image storage
* Image preview
* Image viewer functionality
* Profile image upload
* Post image upload

### Backend

* RESTful API architecture
* MVC-style project structure
* Route-controller-service architecture
* Centralized error handling
* Request validation using Joi
* Authentication middleware
* Async request handling
* MongoDB integration using Mongoose
* Modular API routes
* Reusable utility functions

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* React Hook Form
* Zod
* React Hot Toast
* React Icons
* CSS Modules
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Cloudinary
* Joi
* Nodemailer
* Cookie Parser
* CORS
* dotenv

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* Thunder Client

---

## Architecture

DevConnect follows a client-server architecture.

```text
React Client
     │
     │ HTTP Requests
     ▼
Axios API Layer
     │
     ▼
Express REST API
     │
     ├── Authentication Middleware
     ├── Validation Middleware
     ├── Controllers
     ├── Services
     │
     ▼
MongoDB / Mongoose
     │
     └── Cloudinary
          │
          └── Image Storage
```

The frontend communicates with the backend through REST APIs using Axios. The Express server handles authentication, validation, business logic, and database operations.

---

## Authentication Flow

The application uses JWT-based authentication with HTTP-only cookies.

```text
User
 │
 ▼
Login / Register
 │
 ▼
Express API
 │
 ▼
Validate Credentials
 │
 ▼
bcrypt Password Verification
 │
 ▼
Generate JWT
 │
 ▼
HTTP-only Cookie
 │
 ▼
Protected API Requests
```

Protected routes verify the authenticated user before allowing access to restricted resources.

---

## Project Structure

```text
DevConnect
│
├── client
│   ├── public
│   └── src
│       ├── api
│       ├── components
│       ├── context
│       ├── hooks
│       ├── layouts
│       ├── pages
│       ├── routes
│       ├── services
│       └── validation
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   │
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## Backend Architecture

The backend follows a modular route-controller-service architecture.

```text
Client Request
      │
      ▼
     Route
      │
      ▼
  Middleware
      │
      ├── Authentication
      ├── Validation
      └── Error Handling
      │
      ▼
  Controller
      │
      ▼
   Service
      │
      ▼
    Model
      │
      ▼
   MongoDB
```

This structure separates routing, request handling, business logic, database operations, and reusable utilities.

---

## API Modules

The backend provides REST APIs for:

* Authentication
* Users
* Posts
* Comments
* Likes
* Follows
* Notifications

The API follows a modular route-controller-service structure to keep the backend maintainable and scalable.

---

## Security

The application implements several security-related practices:

* Password hashing using bcrypt
* JWT-based authentication
* HTTP-only cookies
* Protected API routes
* Role-based authorization
* Request validation using Joi
* Centralized error handling
* Environment variables for sensitive configuration
* CORS configuration
* Authentication middleware
* Protected frontend routes

---

# Installation

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB
* Git

You also need:

* MongoDB configuration
* Cloudinary configuration

---

## 1. Clone the Repository

```bash
git clone https://github.com/DhruvPatel4820/devconnect.git
```

## 2. Navigate Into the Project

```bash
cd devconnect
```

---

# Backend Setup

## 3. Navigate to the Server Directory

```bash
cd server
```

## 4. Install Backend Dependencies

```bash
npm install
```

## 5. Create Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173
```

Replace the placeholder values with your actual configuration.

## 6. Start the Backend Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will normally run on:

```text
http://localhost:5000
```

---

# Frontend Setup

## 7. Open Another Terminal

From the project root, navigate to the client directory:

```bash
cd client
```

## 8. Install Frontend Dependencies

```bash
npm install
```

## 9. Start the Frontend

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## Environment Variables

Never commit your actual `.env` file or secret credentials to GitHub.

Required backend environment variables include:

| Variable                | Description                        |
| ----------------------- | ---------------------------------- |
| `PORT`                  | Backend server port                |
| `MONGODB_URI`           | MongoDB connection string          |
| `JWT_SECRET`            | Secret used for JWT authentication |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name              |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                 |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret              |
| `CLIENT_URL`            | Frontend application URL           |

A `.env.example` file is included to show the required environment variable structure without exposing sensitive credentials.

---

# API Overview

## Authentication

Handles:

* User registration
* User login
* Authentication
* JWT generation
* Password verification

## Users

Handles:

* User profiles
* Profile updates
* Profile images
* User search
* User suggestions

## Posts

Handles:

* Creating posts
* Updating posts
* Deleting posts
* Fetching posts
* Individual post retrieval
* Likes
* Saved posts

## Comments

Handles:

* Creating comments
* Fetching comments
* Deleting comments

## Likes

Handles:

* Like posts
* Unlike posts

## Follows

Handles:

* Follow users
* Unfollow users
* Following relationships

## Notifications

Handles:

* User notifications
* Social interaction notifications

---

# Development Workflow

A typical development workflow for DevConnect is:

```text
React UI
   │
   ▼
Axios
   │
   ▼
Express REST API
   │
   ▼
Middleware
   │
   ├── Authentication
   ├── Validation
   └── Error Handling
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Mongoose Models
   │
   ▼
MongoDB
```

### Image Upload Workflow

```text
React Client
     │
     ▼
Express API
     │
     ▼
Multer
     │
     ▼
Cloudinary
     │
     ▼
Cloud Image Storage
```

---

# Error Handling

The backend uses centralized error handling to provide consistent API responses.

The application includes:

* Custom `ApiError` utility
* Centralized error middleware
* Async request handling
* Validation middleware
* Structured API responses

This helps keep error handling consistent across different API modules.

---

# Validation

The project uses validation at different layers.

### Frontend Validation

* React Hook Form
* Zod

### Backend Validation

* Joi
* Validation middleware

This helps prevent invalid data from reaching business logic and database operations.

---

# Media Upload Flow

Post and profile images are handled through the following flow:

```text
User Selects Image
       │
       ▼
React Client
       │
       ▼
Axios Request
       │
       ▼
Express API
       │
       ▼
Multer
       │
       ▼
Cloudinary
       │
       ▼
Image URL
       │
       ▼
MongoDB
```

Cloudinary is used for cloud-based image storage while MongoDB stores the associated image information.

---

# Future Improvements

Possible future improvements include:

* Real-time notifications using Socket.IO
* Pagination and infinite scrolling
* Advanced search and filtering
* Email verification
* Password reset functionality
* Production deployment
* Automated testing
* Performance optimization
* Improved caching
* Additional social features

---

# Learning Outcomes

Through this project, the following full-stack concepts were implemented:

* React component architecture
* React Router
* Protected routes
* REST API development
* Express middleware
* JWT authentication
* HTTP-only cookies
* Password hashing
* MongoDB database integration
* Mongoose models
* MVC architecture
* Route-controller-service architecture
* API validation
* Error handling
* Image upload
* Cloudinary integration
* Axios API communication
* Git and GitHub workflow

---

# Author

**Dhruv Chandra Patel**

* GitHub: [DhruvPatel4820](https://github.com/DhruvPatel4820)
* LinkedIn: [Dhruv Patel](https://www.linkedin.com/in/dhruvpatel4820/)

---

# License

This project is created for learning and portfolio purposes.
