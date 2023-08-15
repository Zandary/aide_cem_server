const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))

app.listen(33455, () => {
  console.log('Server is running on port 3000');
});