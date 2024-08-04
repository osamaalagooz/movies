const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const cors = require('cors');

const authMiddelware = require('./middlewares/authMiddelware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
require('dotenv').config();

connectDB();


app.use(cors());

app.use(express.json());

app.use(authMiddelware.protect);

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use(errorHandler);

module.exports = app;
