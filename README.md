# DevConnect

A full-stack social media platform built with the **MERN stack** that allows users to create and manage posts, interact with other users, follow profiles, share images, save posts, and receive notifications.

DevConnect is designed with a modular **client-server architecture** using React.js on the frontend and Node.js, Express.js, and MongoDB on the backend.

---

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Access and refresh token implementation
* HTTP-only cookie-based authentication
* Protected routes
* Public and protected route handling
* Role-based authorization
* Secure password hashing using bcrypt
* Authentication middleware
* Frontend authentication context
* Form validation

### Posts

* Create posts with text and images
* Edit posts
* Delete posts
* View individual posts
* Feed-based post display
* Like and unlike posts
* Save posts for later
* Image preview
* Image viewer functionality

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
* Profile image upload
* Post image upload
* Image preview
* Image viewer functionality

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
* Structured API responses

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

DevConnect follows a modular client-server architecture.

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

The React frontend communicates with the Express backend through REST APIs using Axios.

The backend handles:

* Authentication
* Request validation
* Business logic
* Database operations
* Image management
* Error handling

---

## Authentication Flow

The application uses JWT-based authentication with access and refresh tokens.

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
Generate Access + Refresh Tokens
 │
 ▼
HTTP-only Cookies
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

The backend follows a modular **route-controller-service architecture**.

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

This structure separates:

* Routing
* Authentication
* Validation
* Request handling
* Business logic
* Database operations
* Error handling
* Reusable utilities

This makes the backend easier to maintain and extend.

---

## API Modules

The backend provides REST APIs for:

### Authentication

* User registration
* User login
* Access token generation
* Refresh token handling
* Password verification

### Users

* User profiles
* Profile updates
* Profile images
* User search
* User suggestions

### Posts

* Create posts
* Update posts
* Delete posts
* Fetch posts
* Fetch individual posts
* Like posts
* Save posts

### Comments

* Create comments
* Fetch comments
* Delete comments

### Likes

* Like posts
* Unlike posts

### Follows

* Follow users
* Unfollow users
* Manage following relationships

### Notifications

* User notifications
* Social interaction notifications

---

## Security

The application implements several security-related practices:

* Password hashing using bcrypt
* JWT-based authentication
* Access and refresh tokens
* HTTP-only cookies
* Protected API routes
* Protected frontend routes
* Role-based authorization
* Request validation using Joi
* Authentication middleware
* Centralized error handling
* Environment variables for sensitive configuration
* CORS configuration

---

# Installation

## Prerequisites

Make sure the following are installed on your system:

* Node.js
* npm
* MongoDB
* Git

You also need configuration/accounts for:

* MongoDB
* Cloudinary

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

Use the following structure:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_accessToken_secret
ACCESS_TOKEN_EXPIRY=set_accesstoken_expireDate

REFRESH_TOKEN_SECRET=your_refreshToken_secret
REFRESH_TOKEN_EXPIRY=set_refreshToken_expireDate

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace the placeholder values with your actual configuration.

### Environment Variables

| Variable                | Description                        |
| ----------------------- | ---------------------------------- |
| `PORT`                  | Backend server port                |
| `MONGO_URI`             | MongoDB connection string          |
| `ACCESS_TOKEN_SECRET`   | Secret used to sign access tokens  |
| `ACCESS_TOKEN_EXPIRY`   | Access token expiration time       |
| `REFRESH_TOKEN_SECRET`  | Secret used to sign refresh tokens |
| `REFRESH_TOKEN_EXPIRY`  | Refresh token expiration time      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name              |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                 |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret              |

> **Important:** Never commit your actual `.env` file or expose secret credentials in the repository.

A `.env.example` file is included in the project to show the required environment variable structure without exposing sensitive credentials.

---

## 6. Start the Backend Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend runs on the port specified in the environment configuration.

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

The Vite development server will provide the frontend URL in the terminal.

---

# Environment Variables

Never commit your actual `.env` file or secret credentials to GitHub.

The project uses environment variables for:

* MongoDB connection
* JWT access token configuration
* JWT refresh token configuration
* Cloudinary configuration
* Server configuration

The `.env.example` file can be used as a reference when configuring the application locally.

---

# Development Workflow

A typical request flow in DevConnect is:

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

---

## Image Upload Workflow

Image-related operations follow this flow:

```text
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

Cloudinary is used for cloud-based image storage, while MongoDB stores the associated image information.

---

# Error Handling

The backend uses centralized error handling to provide consistent API responses.

The application includes:

* Custom `ApiError` utility
* Centralized error middleware
* Async request handling
* Validation middleware
* Structured API responses

This keeps error handling consistent across different API modules.

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

# Media Management

DevConnect uses **Multer** for handling incoming image uploads and **Cloudinary** for cloud-based image storage.

The media system supports:

* Post image uploads
* Profile image uploads
* Image previews
* Image viewing
* Cloud image storage

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
* Access and refresh token handling
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
