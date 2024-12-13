const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Negocio extends Model {}

Negocio.init(
  {
    id_negocio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_Negocio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion_Negocio: {
      type: DataTypes.STRING,
    },
    referente: {
      type: DataTypes.STRING,
    },
    telefono_ref: {
      type: DataTypes.STRING,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.FLOAT,
    },
    longitud: {
      type: DataTypes.FLOAT,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Negocio',
    tableName: 'negocio',
    timestamps: false,
  }
);

module.exports = Negocio;
