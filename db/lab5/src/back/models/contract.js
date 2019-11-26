module.exports = (sequelize, DataTypes) => {
    let Contract = sequelize.define('contracts', {
      idcontract: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idclient: DataTypes.INTEGER,
      idtariff: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      type: DataTypes.TEXT,
      idprovider: DataTypes.INTEGER
    }, {
      timestamps: false
    });
    return Contract;
};