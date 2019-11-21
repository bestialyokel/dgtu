module.exports = (sequelize, DataTypes) => {
    let Tariff = sequelize.define('Tariff', {
      idTariff: DataTypes.UUID,
      payment: DataTypes.REAL,
      name: DataTypes.TEXT,
      period: DataTypes.INTEGER
    });
    return Tariff
};