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
const REQUEST_LIMIT_PER_BIN = 10;

app.use(cors());

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
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended: true}));

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

// Create a new bin
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
    return false
  }
}

app.get('/api/bins/:path', async (request, response) => {
  const path = request.params.path;
  const bin = await getBinInfoFromPath(path);
  if (bin) {
    delete bin.id
    const requests = await Request.find({ path: path })
    response.status(200).json([bin, requests]);
  } else {
    response.status(404).send("not a valid bin");
  }
});

app.delete("/api/bins/:path", async (req, res) => {
  const path = req.params.path;
  const bin = await getBinInfoFromPath(req.params.path);
  if (!bin) {
    res.status(404).send("bin not found");
  }

  await Request.deleteMany({ path: path });
  const requests = await Request.find({ path: path });

  await pool.query("DELETE FROM bins WHERE path = $1", [path]);
  const bins = await pool.query("SELECT * FROM bins WHERE path = $1", [path]);

  if (requests.length === 0 && bins.rows.length === 0) {
    res.status(204).end();
  } else {
    res.status(409).end();
  }
});

app.all('/target/:path', async (req, res) => {
  const bin = await getBinInfoFromPath(req.params.path);
  if (!bin) {
    res.status(404).send("bin not found");
  }

  const request = new Request({ // taking incoming request and parsing into object to store in MongoDB.
    method: req.method,
    path: req.params.path,
    headers: req.headers,
    body: req.body,
    host_name: req.hostname,
    protocol: req.protocol,
    query: req.query,
    created: Date.now(),
  });

  const requests = await Request.find({ path: req.params.path })
  requests.sort();
  if (requests.length >= REQUEST_LIMIT_PER_BIN) {
    await Request.deleteOne({ _id: requests[0]._id.toString() })
  }

  try {
    await request.save()
    res.status(200).send("message received"); // we can change this, wasnt sure what to send back
  } catch (error) {
    console.log("ERROR inserting request data into MongoDB. Stack:");
    console.log(error.stack);
  }
});

app.listen(port, () => {
  console.log(`start of our Request Box backend on port ${port}`)
})