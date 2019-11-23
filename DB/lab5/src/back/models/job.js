module.exports = (sequelize, DataTypes) => {
    let Job = sequelize.define('jobs', {
      idjob: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idappeal: DataTypes.INTEGER,
      starttime: DataTypes.DATE,
      complexity: DataTypes.TEXT,
      status: DataTypes.TEXT,
    }, {
      timestamps: false
    });
    return Job;
};