# QuoraLite 🚀

A modern full-stack Q&A and post-sharing platform inspired by Quora, built with **React, Vite, Node.js, Express, MongoDB, and JWT Authentication**.
Users can register, log in, create posts, edit their own content, delete posts, and browse content through a responsive and user-friendly interface.

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT-based Authentication
* Persistent User Sessions
* Protected Routes
* Logout Functionality

### 📝 Posts Management

* Create Posts
* View All Posts
* View Single Post Details
* Edit Own Posts
* Delete Own Posts
* Ownership-Based Authorization

### 🎨 Frontend Features

* React + Vite
* Responsive UI
* Tailwind CSS Styling
* Dark/Light Theme Support
* Toast Notifications
* Loading States & Skeleton Screens
* Search Functionality
* Axios API Integration

### ⚙️ Backend Features

* Express REST API
* MongoDB Database
* Mongoose ODM
* JWT Authentication
* Protected Routes Middleware
* CORS Enabled
* Environment Variable Configuration

---

# 🏗️ Project Structure

```text
QuoraLite/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🚀 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

# 📦 Installation

## 1. Clone Repository

```bash
git clone https://github.com/Shahanaj24/Quora_Post.git
cd Quora_Post
```

---

# 🔧 Backend Setup

Navigate to backend folder:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:

```bash
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open a new terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔗 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Request Body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Posts

### Get All Posts

```http
GET /api/posts
```

### Get Single Post

```http
GET /api/posts/:id
```

### Create Post

```http
POST /api/posts
```

Requires:

```http
Authorization: Bearer <token>
```

Request Body:

```json
{
  "content": "Hello QuoraLite!"
}
```

### Update Post

```http
PATCH /api/posts/:id
```

Requires authentication and ownership.

### Delete Post

```http
DELETE /api/posts/:id
```

Requires authentication and ownership.

---

#  Running in Production

## Frontend

```bash
npm run build
npm run preview
```

## Backend

```bash
npm start
```

---

#  Environment Variables

### Backend

```env
MONGO_URI=
JWT_SECRET=
PORT=5000
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

#  Screenshots

Add screenshots of:

* Home Page
* Login Page
* Register Page
* Post Feed
* Dashboard

---

#  Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is open-source and available under the MIT License.

---

##  Author

**Shahanaj**

GitHub: https://github.com/Shahanaj24
