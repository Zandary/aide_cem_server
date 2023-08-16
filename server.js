const mongoose = require('mongoose');
const Sunupay = require('./model/Sunupay');
const Nyvolako = require('./model/Nyvolako');
const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    try {
      console.log('Connected to the database');
      
      const app = express();
      const port = 33455;
  
      app.use(cors()); // Enable CORS for all routes
  
      // Fetch all data from nyvolako
    app.get('/nyvolako', async (req, res) => {
      try {
        const articles = await Nyvolako.find();
        res.json(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Fetch single article by ID from nyvolako
    app.get('/nyvolako/:id', async (req, res) => {
      try {
        const article = await Nyvolako.findById(req.params.id);
        if (!article) {
          return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
      } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Fetch all data from sunupay
    app.get('/sunupay', async (req, res) => {
      try {
        const articles = await Sunupay.find();
        res.json(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Fetch single article by ID from sunupay
    app.get('/sunupay/:id', async (req, res) => {
      try {
        const article = await Sunupay.findById(req.params.id);
        if (!article) {
          return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
      } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });