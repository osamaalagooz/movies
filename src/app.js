const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddelware = require('./middlewares/authMiddelware');
const errorHandler = require('./middlewares/errorHandler');


const app = express();
require('dotenv').config();

connectDB();

app.use(express.json());

app.use(authMiddelware.protect);

app.use('/api/auth', authRoutes);

app.use(errorHandler);

module.exports = app;
