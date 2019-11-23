module.exports = (sequelize, DataTypes) => {
    let Worker = sequelize.define('workers', {
      idworker: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idjob: DataTypes.INTEGER,
      name: DataTypes.TEXT,
      patronymic: DataTypes.TEXT,
      surname: DataTypes.TEXT,
      qualification: DataTypes.TEXT
    }, {
      timestamps: false
    });
    return Worker;
};