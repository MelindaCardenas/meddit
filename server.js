const express = require('express')
const db = require('./db')

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000

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
    //db.none: execute this query, but no need to return anything 
    //db.none already knows that we want to take out ${full_name} from req.body 
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
    //.any, .none etc are pgpromise method / pgpromise is in db.js
    const posts = await db.any(`select * from posts`)
    return res.json(posts)
  } catch (err) {
    res.status(500).send(err)
  }
})

//create a post
app.post('/posts/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    //db.none: execute this query, but no need to return anything 
    //db.none already knows that we want to take out ${full_name} from req.body 
    if (userId) {
      await db.none('insert into posts (text) values (${text})', req.body)
    }


    return res.json({
      message: 'success'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//update a post
app.patch('/posts', async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    //$1 = req.body.name, $2=req.body.email, $3 = req.body.eamil
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
    //$1 = studentId in line 67
    await db.none('delete from posts where id = $1', postId)
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