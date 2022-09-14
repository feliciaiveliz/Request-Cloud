const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const helper = require('./utility/helper')

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  user: 'ben',
  database: 'request_box',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM bins', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app.use(bodyParser.json())
app.get('/', (req, res) => {
  getUsers(req, res)
})

// app.get('/api/bin/:id', (req, res) => {

// })

app.post('/api/bin', (req, res) => {
  const path = helper.random(20);
  

  res.send(path)
})

app.listen(port, () => {
  console.log(`start of our Request Box backend on port ${port}`)
})

/*

creating a bin
  POST
  generate unique path
  create a post request
    - connect to postgres db => done
    -  

  


*/