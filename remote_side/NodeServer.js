const express = require('express');

const app = express();

const path = require('path');

app.use(express.static('remote_side'));

app.use(express.json());

const port = 8000;

const localhost = '192.168.0.101';

app.get('/', (req, res) => {
 //res.send('Hello from Node!');
 res.sendFile(path.join(__dirname, '../remote_side/NodeIndex.html'));
});

app.post('/node', (req, res) => {
  console.log(req.body.User);
  res.send(req.body);
});

app.listen(port,localhost, () => {
 console.log(`Server is running at http://${localhost}:${port}`);
});

app.use((req, res) => {
 res.status(404).send('Resource not found');
});

