module.exports = (sequelize, DataTypes) => {
    let Contract = sequelize.define('Contract', {
      idContract: DataTypes.UUID,
      idClient: DataTypes.INTEGER,
      idTariff: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      type: DataTypes.TEXT,
      idProvider: DataTypes.INTEGER
    });
    return Contract;
};