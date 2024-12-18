# Blog Application API

This is a RESTful API for a blog application hosted at [Blog Application](https://blog-application-taz1.onrender.com). The API handles user authentication, CRUD operations for posts, and comments.

---

## Base URL

```
https://blog-application-taz1.onrender.com
```

---

## Authentication Endpoints

### **1. POST /auth/signup**
**Purpose**: Create a new user.

#### Request Body
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}
```

#### Response
- **201**: User created successfully.
- **400**: Missing fields or email already exists.

---

### **2. POST /auth/login**
**Purpose**: Authenticate a user and provide a JWT token.

#### Request Body
```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

#### Response
- **200**: Login successful (includes token in cookies).
- **400**: Missing fields, user not found, or incorrect password.

---

### **3. POST /auth/logout**
**Purpose**: Invalidate the current user's session.

#### Response
- **200**: Logout successful.

---

## Post Endpoints

### **1. GET /api/posts**
**Purpose**: Retrieve all posts.

**URL**: [https://blog-application-taz1.onrender.com/api/posts](https://blog-application-taz1.onrender.com/api/posts)

#### Response
- **200**: Array of posts.

---

### **2. POST /api/posts**
**Purpose**: Create a new post.

**URL**: [https://blog-application-taz1.onrender.com/api/posts](https://blog-application-taz1.onrender.com/api/posts)

#### Headers
- Requires JWT token.

#### Request Body
```json
{
    "title": "My First Post",
    "description": "This is my first blog post."
}
```

#### Response
- **201**: Post created successfully.
- **400**: Missing fields.
- **401**: Unauthorized.

---

### **3. GET /api/posts/:id**
**Purpose**: Retrieve a single post by ID.

**URL**: [https://blog-application-taz1.onrender.com/api/posts/:id](https://blog-application-taz1.onrender.com/api/posts/:id)

#### Response
- **200**: Post details.
- **404**: Post not found.

---

### **4. PUT /api/posts/:id**
**Purpose**: Update a post by ID.

**URL**: [https://blog-application-taz1.onrender.com/api/posts/:id](https://blog-application-taz1.onrender.com/api/posts/:id)

#### Headers
- Requires JWT token.

#### Request Body
```json
{
    "title": "Updated Title",
    "description": "Updated Description."
}
```

#### Response
- **200**: Post updated successfully.
- **400**: Missing fields.
- **401**: Unauthorized.
- **404**: Post not found.

---

### **5. DELETE /api/posts/:id**
**Purpose**: Delete a post by ID.

**URL**: [https://blog-application-taz1.onrender.com/api/posts/:id](https://blog-application-taz1.onrender.com/api/posts/:id)

#### Headers
- Requires JWT token.

#### Response
- **200**: Post deleted successfully.
- **401**: Unauthorized.
- **404**: Post not found.

---

## Comment Endpoints

### **1. GET /api/comments**
**Purpose**: Retrieve all comments.

**URL**: [https://blog-application-taz1.onrender.com/api/comments](https://blog-application-taz1.onrender.com/api/comments)

#### Response
- **200**: Array of comments.

---

### **2. POST /api/comments**
**Purpose**: Create a new comment for a specific post.

**URL**: [https://blog-application-taz1.onrender.com/api/comments](https://blog-application-taz1.onrender.com/api/comments)

#### Headers
- Requires JWT token.

#### Request Body
```json
{
    "content": "This is a comment.",
    "postId": "<Post ID>"
}
```

#### Response
- **200**: Comment added successfully.
- **400**: Missing fields.
- **401**: Unauthorized.

---

### **3. PUT /api/comments/:id**
**Purpose**: Update a comment by ID.

**URL**: [https://blog-application-taz1.onrender.com/api/comments/:id](https://blog-application-taz1.onrender.com/api/comments/:id)

#### Headers
- Requires JWT token.

#### Request Body
```json
{
    "content": "Updated comment content."
}
```

#### Response
- **200**: Comment updated successfully.
- **400**: Missing fields.
- **401**: Unauthorized.
- **404**: Comment not found.

---

### **4. DELETE /api/comments/:id**
**Purpose**: Delete a comment by ID.

**URL**: [https://blog-application-taz1.onrender.com/api/comments/:id](https://blog-application-taz1.onrender.com/api/comments/:id)

#### Headers
- Requires JWT token.

#### Response
- **200**: Comment deleted successfully.
- **401**: Unauthorized.
- **404**: Comment not found.

---

## Error Handling
All endpoints return appropriate HTTP status codes and error messages in case of failures:
- **400**: Bad Request (e.g., missing fields).
- **401**: Unauthorized (e.g., missing or invalid token).
- **404**: Not Found (e.g., post or comment not found).
- **500**: Internal Server Error.

---

## Environment Variables
Ensure the following environment variables are set:
- `PORT`: The port on which the server runs.
- `URL`: MongoDB connection string.
- `JWT_PRIVATE`: The secret key for JWT token generation.

---

## Technologies Used
- **Express.js**: Backend framework.
- **Mongoose**: MongoDB ODM.
- **JWT**: Authentication.
- **dotenv**: Environment variable management.

---

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=4949
   URL=your_mongodb_connection_string
   JWT_PRIVATE=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the API at:
   [https://blog-application-taz1.onrender.com](https://blog-application-taz1.onrender.com)

---

## License
This project is licensed under the MIT License.
