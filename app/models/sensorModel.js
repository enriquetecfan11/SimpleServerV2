module.exports = (sequelize, Sequelize) => {
  const sensor = sequelize.define('sensor', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    uuid: {
      type: Sequelize.STRING,
      allowNull: true
    },
  },
    {
      timestamps: true,
    });

  return sensor;
}
