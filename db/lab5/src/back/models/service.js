module.exports = (sequelize, DataTypes) => {
    let Service = sequelize.define('services', {
      idservice: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idtariff: DataTypes.INTEGER,
      payment: DataTypes.REAL,
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
    }, {
      timestamps: false
    });
    return Service;
};