let knexfile = require('./knexfile')
const pg = require('pg-promise')()

const db = pg({
  "host": "localhost",
  "port": 5432,
  "database": "meddit",
  "user": process.env.USERNAME
})

module.exports = db;
