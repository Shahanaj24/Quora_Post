# QuoraLite — Backend API

This repository contains the backend API for QuoraLite — a minimal post-management service backed by MongoDB and JWT authentication. The API is designed to serve a separate React frontend.

Core features
- JSON REST API for posts
- User registration and login with JWT
- Ownership checks for editing/deleting posts
- CORS enabled for frontend development

This README explains how to run the API locally, required environment variables, and the available endpoints that the frontend expects.

## Requirements

- Node.js 18+ (or compatible)
- MongoDB (connection URI)

## Install

```bash
cd Backend
npm install
```

## Environment

Create a `.env` file in the `Backend/` folder (we include an example in the repo). Required variables:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `PORT` — optional (defaults to 5000)

Example `.env`:

```
MONGO_URI=mongodb://localhost:27017/quora_posts
JWT_SECRET=some_long_random_secret
PORT=5000
```

## Run

Start the API server:

```bash
cd Backend
npm start
```

The server listens on `http://localhost:5000` by default and exposes the API under `/api`.

## API Endpoints

All endpoints return JSON. The frontend expects these endpoints and shapes.

Authentication

- `POST /api/auth/register`
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `201 { "token": string, "user": { id, username, email } }`

- `POST /api/auth/login`
  - Body: `{ "email": string, "password": string }`
  - Response: `200 { "token": string, "user": { id, username, email } }`

- `POST /api/auth/logout`
  - No body. Returns `{ ok: true }` (logout is client-side token removal).

Posts

- `GET /api/posts`
  - Returns: `200 [ { _id, username, content, createdAt, updatedAt }, ... ]`

- `GET /api/posts/:id`
  - Returns single post or `404` when not found.

- `POST /api/posts` (requires `Authorization: Bearer <token>`)
  - Body: `{ "content": string }`
  - Creates a post with the authenticated user's `username` as author.

- `PATCH /api/posts/:id` (requires token; only post owner)
  - Body: `{ "content": string }` — updates post content.

- `DELETE /api/posts/:id` (requires token; only post owner)
  - Removes the post.

Health

- `GET /api/health` — returns `{ ok: true }`.

## Examples

Register a new user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret"}'
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Create a post (replace `<TOKEN>`):

```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"content":"Hello from the API"}'
```

## Notes & Next steps

- Ownership checks compare the `post.username` field with the authenticated user's `username`.
- Logout is handled by deleting the token on the client — the `/api/auth/logout` route is a convenience no-op.
- For production, rotate `JWT_SECRET`, add rate limiting, input validation, and HTTPS.

If you want, I can add request validation and more detailed error payloads next.
