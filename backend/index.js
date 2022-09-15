require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const helper = require('./utility/helper');
const { response } = require('express');
const Pool = require('pg').Pool
const password = process.env.POSTGRES_PASSWORD
const Request = require('./models/request')

app.use(cors());

const pool = new Pool({
  host: 'localhost',
  user: 'mattmalane',
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
    response.status(201).send(path);
  } catch (error) {
    response.status(409).end();
  }
});

const getBinInfoFromPath = async (path) => {
  const text = "SELECT * FROM bins WHERE path = $1";

  try {
    const result = await pool.query(text, [path]);
    return result.rows[0];
  } catch (error) {
    console.log("ERROR retrieving bin. Stack:");
    console.log(error.stack);
  }
}

const getRequestsFromBin = async (id) => {
  const text = "SELECT request_id_mongo FROM requests WHERE bin_id = $1"

  try {
    const result = await pool.query(text, [id]);
    return result.rows.map(object => object.request_id_mongo)
  } catch (error) {
    console.log("ERROR retrieving requests. Stack:");
    console.log(error.stack);
  }
}

// connect mongodb to our app
// make a query into mongo collection
  // get all requests that match the request_mongo_id
  // return all the requests

app.get('/api/bins/:path', async (request, response) => {
  const path = request.params.path;

  // try {
  //   const bin = await getBinInfoFromPath(path);
  //   const requests = await getRequestsFromBin(bin.id);
  //   response.status(200).json([bin, requests]);
  // } catch (error) {
  //   response.status(404).end();
  // }
  const bin = await getBinInfoFromPath(path); // 106 - 108 is working. feel free to change though.
  const requests = await Request.find({ path: path })
  response.status(200).json([bin, requests]);
})

// receive requests at our request bin URL/PATH for GET requests and POST requests
// these two paths below are pretty much identical besides the route method (app.get/app.post)
// need to be refactored.

app.get('/target/:path', async (req, res) => {
  const request = new Request({ // taking incoming request and parsing into object to store in MongoDB.
    method: req.method,
    path: req.params.path,
    headers: req.headers,
    body: req.body,
    host_name: req.hostname,
    protocol: req.protocol,
  })

  const savedRequest = await request.save() // sending request object async
  const mongoID = savedRequest.id // saving mongo db ID
  // need to create a record in our request table in postgres
  const path = req.params.path // this is the path for the existing bin
  const binInfo = await getBinInfoFromPath(path) // retrieve bin info from path
  const binId = binInfo.id // retrieve id from bin info
  // // insert into request table; bin_id => binId, request_mongo_id => mongoID
  const text = "INSERT INTO requests (bin_id, request_id_mongo) VALUES ($1, $2)";

  try {
    await pool.query(text, [binId, mongoID]);
    res.status(200).send("message received") // we can change this, wasnt sure what to send back
  } catch (error) {
    console.log("ERROR inserting request into postgresql requests table. Stack:");
    console.log(error.stack);
  }
})

app.post('/target/:path', async (req, res) => {
  const request = new Request({ // taking incoming request and parsing into object to store in MongoDB.
    method: req.method,
    path: req.params.path,
    headers: req.headers,
    body: req.body,
    host_name: req.hostname,
    protocol: req.protocol,
  })

  const savedRequest = await request.save() // sending request object async
  const mongoID = savedRequest.id // saving mongo db ID
  // need to create a record in our request table in postgres
  const path = req.params.path // this is the path for the existing bin
  const binInfo = await getBinInfoFromPath(path) // retrieve bin info from path
  const binId = binInfo.id // retrieve id from bin info
  // // insert into request table; bin_id => binId, request_mongo_id => mongoID
  const text = "INSERT INTO requests (bin_id, request_id_mongo) VALUES ($1, $2)";

  try {
    await pool.query(text, [binId, mongoID]);
    res.status(200).send("message received") // we can change this, wasnt sure what to send back
  } catch (error) {
    console.log("ERROR inserting request into postgresql requests table. Stack:");
    console.log(error.stack);
  }
})

app.listen(port, () => {
  console.log(`start of our Request Box backend on port ${port}`)
})