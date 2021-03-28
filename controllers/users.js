const db = require('../db')

// get all users 
const getUsers = async (req, res) => {
    try {
        //.any, .none etc are pgpromise method / pgpromise is in db.js
        const users = await db.any(`select * from users`)
        return res.json(users)
    } catch (err) {
        res.status(500).send(err)
    }
};

// create a user
const createUser = async (req, res) => {
    try {
        await db.none('insert into users (username) values (${username})', req.body)

        return res.json({
            message: 'success'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = { getUsers, createUser }