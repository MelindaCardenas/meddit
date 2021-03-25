const express = require('express')
const db = require('./db')
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000

//get user
app.get('/users', async (req, res) => {
    try {
      const users = await db.any(`select * from users`)
      return res.json(users)
    } catch (err) {
      res.status(500).send(err)
    }
})
  
//add user to table
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

//get post 
//add post to table
//update post
//delete post

//get comment
//add comment to table