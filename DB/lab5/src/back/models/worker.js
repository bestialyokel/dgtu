module.exports = (sequelize, DataTypes) => {
    let Worker = sequelize.define('Worker', {
      idWorker: DataTypes.UUID,
      idJob: DataTypes.INTEGER,
      name: DataTypes.TEXT,
      patronymic: DataTypes.TEXT,
      surname: DataTypes.TEXT,
      qualification: DataTypes.TEXT
    });
    return Worker;
};