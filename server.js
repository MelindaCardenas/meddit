const express = require('express')
const users = require('./controllers/users')
const posts = require('./controllers/posts')
const comments = require('./controllers/comments')
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const PORT = process.env.PORT || 3000

//************* users ****************/
// get all users 
app.get('/users', users.getUsers)

// create a user
app.post('/users', users.createUser)

//************* posts ****************
//get all posts
app.get('/posts', posts.getPosts)

//get one post
app.get('/posts/:postId', posts.getOnePost)

//create a post
app.post('/posts', posts.createPost)

//update a post
app.patch('/posts/:postId', posts.updatePost)

//delete a post
app.delete('/posts/:postId', posts.deletePost)

//************* comments ****************/
//get comments
app.get('/posts/:postId/comments', comments.getComments)

//create a comment
app.post('/posts/:postId/comments', comments.createComment)

//delete a commment
app.delete('/posts/:postId/comments/:commentId', comments.deleteComment)



app.listen(PORT, () => {
  console.log(`listenining on http://localhost:${PORT}`)
})

