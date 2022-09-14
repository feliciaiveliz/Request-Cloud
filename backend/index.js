const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const helper = require('./utility/helper')
const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  user: 'ben',
  database: 'request_box',
  port: 5432,
})

const getBins = async () => {
  try {
    const result = await pool.query('SELECT * FROM bins')
    return result.rows
  } catch (error) {
    console.log("ERROR accessing all bins. Stack:")
    console.log(error.stack)
  }
}

app.use(bodyParser.json())

app.get('/', async (_, response) => {
  try {
    const bins = await getBins()
    response.status(200).json(bins)
  } catch(error) {
    console.log("oops");
    response.status(404).end();
  }
})

// app.get('/api/bin/:id', (req, res) => {

// })

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