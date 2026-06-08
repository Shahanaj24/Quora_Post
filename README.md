# 📌 Quora Post CRUD App (MongoDB + Express + EJS)

## 📖 Project Overview

This project is a **Quora-style post management web application** built using **Node.js, Express, MongoDB, and EJS**.
Users can create, read, update, and delete posts with persistent database storage.

This project demonstrates:

* CRUD operations
* RESTful routing
* MongoDB integration
* MVC-style backend structure
* Server-side rendering using EJS

---

## 🚀 Features

✔ Create new posts
✔ View all posts
✔ View single post
✔ Edit post
✔ Delete post
✔ MongoDB database storage
✔ Method override for PATCH & DELETE
✔ Environment variable configuration

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* Method-Override
* Dotenv

---

## 📂 Folder Structure

```
Quora_Post-main
│
├── index.js
├── package.json
├── .env
│
└── src
    ├── db
    │   └── db.js
    ├── model
    │   └── Post.js
    ├── views
    │   ├── index.ejs
    │   ├── new.ejs
    │   ├── edit.ejs
    │   ├── show.ejs
    │   └── error.ejs
    └── public
```

---

## ⚙ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Quora_Post.git
cd Quora_Post
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
MONGO_URI=mongodb://127.0.0.1:27017/quoraApp
```

---

### 4️⃣ Run MongoDB Server

```bash
mongod
```

---

### 5️⃣ Start Application

```bash
node index.js
```

OR (recommended)

```bash
npx nodemon index.js
```

Open browser:

```
http://localhost:8080/posts
```

---

## 🔁 REST API Routes

| Method | Route           | Description         |
| ------ | --------------- | ------------------- |
| GET    | /posts          | Show all posts      |
| GET    | /posts/new      | Form to create post |
| POST   | /posts          | Create post         |
| GET    | /posts/:id      | Show single post    |
| GET    | /posts/:id/edit | Edit form           |
| PATCH  | /posts/:id      | Update post         |
| DELETE | /posts/:id      | Delete post         |

---

## 💡 What I Learned

* Connecting Node.js app with MongoDB
* Creating schemas using Mongoose
* Implementing RESTful routes
* Using EJS templating engine
* Handling forms and HTTP methods
* Organizing backend structure

---

## 📈 Future Improvements

* User authentication (Login/Register)
* Like & comment system
* Image upload
* Flash messages
* Deployment on cloud
* API version

---

## 👩‍💻 Author

**Your Name**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!
