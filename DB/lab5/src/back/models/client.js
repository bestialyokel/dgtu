module.exports = (sequelize, DataTypes) => {
    let Client = sequelize.define('Client', {
      idClient: DataTypes.UUID,
      surname: DataTypes.TEXT,
      name: DataTypes.TEXT,
      patronymic: DataTypes.TEXT,
      phonenumber: DataTypes.TEXT
    });
    return Client;
};