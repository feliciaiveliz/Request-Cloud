const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const helper = require('./utility/helper');
const { response } = require('express');

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  user: 'ben',
  database: 'request_box',
  port: 5432,
});

const getBins = async () => {
  try {
    const result = await pool.query('SELECT * FROM bins')
    return result.rows
  } catch (error) {
    console.log("ERROR accessing all bins. Stack:");
    console.log(error.stack);
  }
}

app.use(bodyParser.json());

app.get('/api/bins', async (_, response) => {
  try {
    const bins = await getBins()
    const paths = bins.map(bin => bin.path)
    response.status(200).json(paths)
  } catch(error) {
    console.log("oops");
    response.status(404).end();
  }
});

const createBin = async (path) => {
  const text = "INSERT INTO bins (path) VALUES ($1)";

  try {
    await pool.query(text, [path]);
  } catch (error) {
    console.log("ERROR accessing all bins. Stack:");
    console.log(error.stack);
  }
}

app.post('/api/bins', async (_, response) => {
  const path = helper.random(20);

  try {
    await createBin(path)
    console.log("IS THIS WOKRING?");
    response.status(201).send(path);
  } catch (error) {
    response.status(409).end();
  }
});

app.listen(port, () => {
  console.log(`start of our Request Box backend on port ${port}`)
})