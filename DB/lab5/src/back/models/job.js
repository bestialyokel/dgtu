module.exports = (sequelize, DataTypes) => {
    let Job = sequelize.define('Job', {
      idJob: DataTypes.UUID,
      idAppeal: DataTypes.INTEGER,
      starttime: DataTypes.DATE,
      complexity: DataTypes.TEXT,
      status: DataTypes.TEXT,
    });
    return Job;
};