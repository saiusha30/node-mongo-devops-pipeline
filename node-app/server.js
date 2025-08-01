const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydb';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from Node.js API with MongoDB!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

