# QuoraLite Frontend

A modern React + Vite frontend for the QuoraLite backend.

## Features

- Authentication flow with login, register, logout, and persistent JWT sessions
- Protected route handling for authenticated pages
- Post feed, single post details, create/edit/delete post flow
- User dashboard showing personal posts
- Search experience, loading states, skeletons, and toast notifications
- Responsive, mobile-friendly Tailwind UI with dark/light theme support
- Centralized Axios API layer with request/response interceptors

## Setup

1. Copy the environment example:

   ```bash
   cp .env.example .env
   ```

2. Update the API URL if needed:

   ```text
   VITE_API_URL=http://localhost:5000/api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start development server:

   ```bash
   npm run dev
   ```

### Environment

Create a `.env` (or `.env.local`) in the `Frontend/` folder and set the API base URL:

```
VITE_API_URL=http://localhost:5000/api
```

The frontend stores the JWT under `localStorage` key `quoralite_token` and user info under `quoralite_user`.

## Build

```bash
npm run build
```

## Notes

- The frontend expects backend endpoints to be available through `VITE_API_URL`.
- API request and response handling is centralized in `src/services`.
- All routes and page behavior are defined in `src/routes/AppRoutes.jsx`.

## Run (production)

```bash
npm run build
npm run preview
```

## Troubleshooting

- If you see `ERR_CONNECTION_REFUSED` when registering, ensure the backend is running and `VITE_API_URL` points to the correct host/port.
- If registration/login fails with 4xx, check backend logs for validation errors and inspect the network tab to see the returned JSON message.

If you'd like, I can also add a short developer checklist or automated dev script to start both frontend and backend together.
