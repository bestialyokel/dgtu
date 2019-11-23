module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('users', {
      iduser: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idprovider: DataTypes.INTEGER,
      login: DataTypes.TEXT,
      password: DataTypes.TEXT,
      role: DataTypes.STRING(1)
    }, {
      timestamps: false
    });
    return User;
};