module.exports = (sequelize, DataTypes) => {
    let Tariff_dependency = sequelize.define('Tariff_dependencies', {
      idservice: {
          type: DataTypes.UUID,
          references: {
              model: Service,
              key: 'idservice'
          }
      },
      idtariff: {
        type: DataTypes.UUID,
        references: {
            model: Tariff,
            key: 'idtariff'
        }
      },
    }, {
      timestamps: false
    });
    return tariff_dependency;
};