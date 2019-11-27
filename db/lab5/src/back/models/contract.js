module.exports = (sequelize, DataTypes) => {
    let Contract = sequelize.define('contracts', {
      idcontract: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idclient: {
        type: DataTypes.UUID,
        references: {
            model: Client,
            key: 'idclient'
        }
      },
      idtariff: {
        type: DataTypes.UUID,
        references: {
            model: Tariff,
            key: 'idtariff'
        }
      },
      address: DataTypes.TEXT,
      type: DataTypes.TEXT,
      idprovider: {
        type: DataTypes.UUID,
        references: {
            model: Provider,
            key: 'idprovider'
        }
      }
    }, {
      timestamps: false
    });
    return Contract;
};