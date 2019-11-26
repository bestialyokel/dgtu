module.exports = (sequelize, DataTypes) => {
    let Tariff = sequelize.define('tariffs', {
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
    return Tariff
};