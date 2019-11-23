module.exports = (sequelize, DataTypes) => {
    let Appeal = sequelize.define('appeals', {
      idappeal: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idcontract: DataTypes.INTEGER,
      status: DataTypes.TEXT,
      appealdate: DataTypes.DATE,
      description: DataTypes.TEXT
    },
    {
      timestamps: false
    });
    return Appeal;
};