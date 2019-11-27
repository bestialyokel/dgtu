module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('users', {
      iduser: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idprovider: {
        type: DataTypes.UUID,
        references: {
            model: Provider,
            key: 'idprovider'
        }
      },
      login: DataTypes.TEXT,
      password: DataTypes.TEXT,
      role: DataTypes.STRING(1)
    }, {
      timestamps: false
    });
    return User;
};