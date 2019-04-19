const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();
const Post = require('./models/post');

mongoose.connect('mongodb+srv://xander:Zsl1ndOun4wXWmqT@cluster0-ed93v.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })
.then(()=>{
  console.log('Connected to database!');
})
.catch((response)=>{
  console.log('Connection failed!' , response);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts',(req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

module.exports = app;
