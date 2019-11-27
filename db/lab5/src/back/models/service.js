module.exports = (sequelize, DataTypes) => {
    let Service = sequelize.define('services', {
      idservice: {
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
      name: DataTypes.TEXT,
    }, {
      timestamps: false
    });
    return Service;
};