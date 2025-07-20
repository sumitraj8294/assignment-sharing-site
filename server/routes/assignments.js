const express = require('express');
const multer = require('multer');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');
const router = express.Router();

const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Use original filename with timestamp to avoid duplicates
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });


function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send('Invalid Token');
  }
}

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  const { title, topic, description } = req.body;
  const assignment = new Assignment({
    title,
    topic,
    description,
    fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    user: req.user.id
  });
  await assignment.save();
  res.send('Assignment uploaded');
});

router.get('/all', async (req, res) => {
  const assignments = await Assignment.find().populate('user', 'name');
  res.json(assignments);
});

router.get('/user/:id', async (req, res) => {
  const assignments = await Assignment.find({ user: req.params.id });
  res.json(assignments);
});

module.exports = router;
