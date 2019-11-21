module.exports = (sequelize, DataTypes) => {
    let Appeal = sequelize.define("Users", {
      idAppeal: DataTypes.UUID,
      idContract: DataTypes.INTEGER,
      status: DataTypes.TEXT,
      appealdate: DataTypes.DATE,
      description: DataTypes.TEXT
    });
    return Appeal;
};