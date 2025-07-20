require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/Auth');
const assignmentRoutes = require('./routes/assignments');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
