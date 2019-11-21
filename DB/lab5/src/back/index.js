const PORT = 8080;

//dependencies
const db = require('./db/database.js');
const express = require('express');

const app = express();

app.use('/:provider/services', (req, res, next) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.use('/:provider/tariffs', (req, res, next) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.use('/:provider/clients', (req, res, next) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.use('/:provider/contact', (req, res, next) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.use('/:provider/appeals', (req, res, next) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.use('/:provider/workers', (req, res, next) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.use('/:provider/appeals', (req, res, next) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`, db);
});