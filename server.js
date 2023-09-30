const mongoose = require('mongoose');
const Sunupay = require('./model/Sunupay');
const Nyvolako = require('./model/Nyvolako');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Post = require('./model/posts');

require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    try {
      console.log('Connected to the database');
      
      const app = express();
      const port = 34567;
  
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
  
    // Middleware for parsing JSON data
app.use(bodyParser.json());

// Handle POST requests to create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, corps, redacteur, createdAt } = req.body;
    const post = new Post({ title, corps, redacteur, createdAt });
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

      // Fetch all data from posts
    app.get('/api/get-posts', async (req, res) => {
      try {
        const posts = await Post.find();
        res.json(posts);
      } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Post commentaire
    app.post('/api/post-commentary', async (req, res) => {
      try {
        
    const {postID, newCommentary} = req.body; // Replace with the actual post _id

    // Find the post by its _id
    const post = await Post.findOne({ _id: postID });
  
    if (!post) {
      console.log('Post not found');
      return;
    } else {
      console.log("Found Post by ID : ", post.title, typeof post.commentary);
    }
  
    // Add the new commentary to the post's commentary array

    post.commentary.push(newCommentary);
  
    // Save the post with the new commentary
    post.save();
      } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    })
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });