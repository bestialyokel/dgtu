module.exports = (sequelize, DataTypes) => {
    let Worker = sequelize.define('workers', {
      idworker: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idjob: {
        type: DataTypes.UUID,
        references: {
            model: Provider,
            key: 'idprovider'
        }
      },
      name: DataTypes.TEXT,
      patronymic: DataTypes.TEXT,
      surname: DataTypes.TEXT,
      qualification: DataTypes.TEXT
    }, {
      timestamps: false
    });
    return Worker;
};