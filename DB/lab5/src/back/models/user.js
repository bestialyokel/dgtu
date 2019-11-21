module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
      idUser: DataTypes.UUID,
      idProvider: DataTypes.INTEGER,
      login: DataTypes.TEXT,
      password: DataTypes.TEXT,
      role: DataTypes.STRING(1)
    });
    return User;
};