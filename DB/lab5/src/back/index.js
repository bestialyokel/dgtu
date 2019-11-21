const PORT = 8080;

//dependencies
const db = require('./db/database.js');
const sequelize= require('sequelize');
const express = require('express');
const rules = require('./rules.js');

//ебаный колхоз

const Appeal = require('./models/appeal.js')(db, sequelize);
const Client = require('./models/client.js')(db, sequelize);
const Contract = require('./models/contract.js')(db, sequelize);
const Job = require('./models/job.js')(db, sequelize);
const Service = require('./models/service.js')(db, sequelize);
const Tariff = require('./models/tariff.js')(db, sequelize);
const Worker = require('./models/worker.js')(db, sequelize);
const User = require('./models/user.js')(db, sequelize);


Appeal.findAll().then(result => console.log(result));

const app = express();




/*
app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});




app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});




app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});





app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});



app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});


app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});


app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});


app.get('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });

});

app.put('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.post('/:provider/services', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});

app.delete('/:provider/services/:name', (req, res) => {
  console.log(req.params);
  res.send({ message: 'will be services ' });
});




app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`, db);
}); */