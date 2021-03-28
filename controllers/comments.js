const db = require('../db')

//get comments 
const getComments = async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await db.any('select * from comments where post_id=$1', postId)
        return res.json(comments)
    } catch (err) {
        res.status(500).send(err)
    }
}

//create a comment
const createComment = async (req, res) => {
    try {
        await db.none('INSERT INTO comments (user_id, post_id, text) VALUES (${user_id}, ${post_id}, ${text})', req.body)

        return res.json({
            message: 'success'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

//delete a commment
const deleteComment = async (req, res) => {
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
};

module.exports = { getComments, createComment, deleteComment }
