module.exports = (sequelize, DataTypes) => {
    let Provider = sequelize.define('providers', {
      idprovider: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      name: DataTypes.TEXT
    }, {
      timestamps: false
    });
    return Provider;
};