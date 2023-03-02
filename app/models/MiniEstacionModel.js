module.exports = (sequelize, Sequelize) => {
  const miniestacion = sequelize.define('miniestacion', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dispositivo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    hora: {
      type: Sequelize.DATE,
      allowNull: true
    },
    temperatura: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    altura:{
      type: Sequelize.FLOAT,
      allowNull: true
    },
    presion:{
      type: Sequelize.FLOAT,
      allowNull: true
    },
    luxes: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    wifiRsii: {
      type: Sequelize.FLOAT,
      allowNull: true
    }
  },
    {
      timestamps: true,
    });

  return miniestacion;
}
