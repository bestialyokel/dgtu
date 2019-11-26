module.exports = (sequelize, DataTypes) => {
    let Client = sequelize.define('clients', {
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
    return Client;
};