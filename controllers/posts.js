const db = require('../db')

//get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await db.any('select * from posts')
        return res.json(posts)
    } catch (err) {
        res.status(500).send(err)
    }
};

//get one post
const getOnePost = async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    try {
        const posts = await db.any('select * from posts where id=$1', postId)
        return res.json(posts)
    } catch (err) {
        res.status(500).send(err)
    }
};

//create a post
const createPost = async (req, res) => {
    const userName = req.body.userName
    // console.log({ userName })
    const userId = await db.any(`SELECT id FROM users where username = $1`, [userName])
    try {
        await db.none('insert into posts (text, user_id) values ($1, $2)', [req.body.text, userId[0].id])

        return res.json({
            message: 'success'
        })
    } catch (err) {
        res.status(500).json(err)
    }
};

//update a post
const updatePost = async (req, res) => {
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
};


//delete a post
const deletePost = async (req, res) => {
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
};

module.exports = { getPosts, getOnePost, createPost, updatePost, deletePost }

