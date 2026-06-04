const express = require('express');
const connectDB = require('./src/db/db');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/posts', require('./src/routes/posts'));

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
