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
const Provider = require('./models/provider.js')(db, sequelize);


const app = express();


app.get('/login', async (req, res) => {
  const {login, password} = req.query;
  const user  = await User.findOne({
    where: {
      login: login
    }
  });
  if (user && user.dataValues.password == password) {
    const provider = await Provider.findOne({
      where: {
        idprovider: user.dataValues.idprovider
      }
    });
    res.json({login: user.dataValues.login, role: user.dataValues.role, provider: provider.dataValues.name})
  }
  else res.status(401).send("failed login");
  delete password;
}); // login success ==> role, provider, login


app.get('/:provider/services', async (req, res) => {
  console.log(req.params);
  console.log(req.query)
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
  console.log(`Server running at: http://localhost:${PORT}/`);
});