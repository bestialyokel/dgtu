const db = require("./db/database.js");
const DataTypes = require("sequelize");


let Service = db.define('services', {
    idservice: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    idprovider: DataTypes.UUID,
    name: DataTypes.TEXT,
  }, {
    timestamps: false
});

let Tariff = db.define('tariffs', {
    idtariff: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    payment: DataTypes.REAL,
    name: DataTypes.TEXT,
    period: DataTypes.INTEGER
  }, {
    timestamps: false
});

let Tariff_dependency = db.define('tariffs_dependencies', {
    idservice: DataTypes.UUID,
    idtariff: DataTypes.UUID,
  }, {
    timestamps: false
});

let Client = db.define('clients', {
    idclient: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    surname: DataTypes.TEXT,
    name: DataTypes.TEXT,
    patronymic: DataTypes.TEXT,
    phonenumber: DataTypes.TEXT
  },{
    timestamps: false
});

let Contract = db.define('contracts', {
    idcontract: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    idclient: DataTypes.UUID,
    idtariff: DataTypes.UUID,
    address: DataTypes.TEXT,
    type: DataTypes.TEXT,
  }, {
    timestamps: false
});

let Appeal = db.define('appeals', {
    idappeal: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    idcontract: DataTypes.UUID,
    status: DataTypes.TEXT,
    appealdate: DataTypes.DATE,
    description: DataTypes.TEXT
  },
  {
    timestamps: false
});

let Job = db.define('jobs', {
    idjob: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    idappeal: DataTypes.UUID,
    starttime: DataTypes.DATE,
    complexity: DataTypes.TEXT,
    status: DataTypes.TEXT,
  }, {
    timestamps: false
});

let Worker = db.define('workers', {
    idworker: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    idjob: DataTypes.UUID,
    name: DataTypes.TEXT,
    patronymic: DataTypes.TEXT,
    surname: DataTypes.TEXT,
    qualification: DataTypes.TEXT
  }, {
    timestamps: false
});

let User = db.define('users', {
    iduser: {
      type:  DataTypes.UUID,
      primaryKey: true
    },
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: DataTypes.STRING(1)
  }, {
    timestamps: false
});

Tariff.hasMany(Tariff_dependency, {
    foreignKey: 'idtariff'
});

Client.hasMany(Contract, {
    foreignKey: 'idclient'
})

module.exports = {Service, Tariff, Tariff_dependency, Client, Contract, Appeal, Job, Worker, User};


Client.findAll({
    include: Contract
}).then(x => x.forEach(y => console.log(y.contracts)));