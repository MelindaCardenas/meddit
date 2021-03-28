const express = require('express')
const db = require('./db')
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 7000

//************* users ****************/
// get all users 
app.get('/users', async (req, res) => {
  try {
    //.any, .none etc are pgpromise method / pgpromise is in db.js
    const users = await db.any(`select * from users`)
    return res.json(users)
  } catch (err) {
    res.status(500).send(err)
  }
})

// create a user
app.post('/users', async (req, res) => {
  try {
    await db.none('insert into users (username) values (${username})', req.body)

    return res.json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//************* posts ****************
//get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await db.any('select * from posts')
    return res.json(posts)
  } catch (err) {
    res.status(500).send(err)
  }
})

//get one post
app.get('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  try {
    const posts = await db.any('select * from posts where id=$1', postId)
    return res.json(posts)
  } catch (err) {
    res.status(500).send(err)
  }
})

//create a post
app.post('/posts', async (req, res) => {
  try {
    await db.none('insert into posts (user_id, text) values (${user_id}, ${text})', req.body)

    return res.json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//update a post
app.patch('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    await db.none('update posts set text=$1 where id = $2', [req.body.text, postId])

    res.json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


//delete a post
app.delete('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    await db.none('delete from posts where id = $1', postId)
    res.status(204).json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//************* comments ****************/
//get comments
app.get('/posts/:postId/comments', async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await db.any('select * from comments where post_id=$1', postId)
    return res.json(comments)
  } catch (err) {
    res.status(500).send(err)
  }
})

//create a comment
app.post('/posts/:postId/comments', async (req, res) => {
  try {
    await db.none('INSERT INTO comments (user_id, post_id, text) VALUES (${user_id}, ${post_id}, ${text})', req.body)

    return res.json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//delete a commment
app.delete('/posts/:postId/comments/:commentId', async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);

  try {
    //$1 = studentId in line 67
    await db.none('delete from comments where id = $1', commentId)
    res.status(204).json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

app.listen(PORT, () => {
  console.log(`listenining on http://localhost:${PORT}`)
})

