module.exports = (sequelize, DataTypes) => {
    let Appeal = sequelize.define('appeals', {
      idappeal: {
        type:  DataTypes.UUID,
        primaryKey: true
      },
      idcontract: {
        type: DataTypes.UUID,
        references: {
            model: Contract,
            key: 'idcontract'
        }
    },
      status: DataTypes.TEXT,
      appealdate: DataTypes.DATE,
      description: DataTypes.TEXT
    },
    {
      timestamps: false
    });
    return Appeal;
};