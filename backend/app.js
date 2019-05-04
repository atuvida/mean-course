const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();
const Post = require('./models/post');
// JM9f89mT4gscB4Pi
mongoose.connect('mongodb+srv://xander:JM9f89mT4gscB4Pi@cluster0-ed93v.mongodb.net/node-angular?retryWrites=true',{ useNewUrlParser: true })
.then(()=>{
  console.log('Connected to database!');
})
.catch(()=>{
  console.log('Connection failed!');
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
  const posts = [
    {id: 'fadf12421l',
    title: 'First server-side post',
    content: 'This is coing from the server'
    },
    {id: 'gsdfg34rl',
    title: 'Second server-side post',
    content: 'This is coing from the server'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
