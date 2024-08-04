const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddelware = require('./middlewares/authMiddelware');

const app = express();
require('dotenv').config();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(authMiddelware.protect);

module.exports = app;
