module.exports = (sequelize, DataTypes) => {
    let Service = sequelize.define('Service', {
      idService: DataTypes.UUID,
      idTariff: DataTypes.INTEGER,
      payment: DataTypes.REAL,
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
    });
    return Service;
};