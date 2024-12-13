const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class DatosComplementarios extends Model {}

DatosComplementarios.init(
  {
    id_datos_complementarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(20),
    },
    calle: {
      type: DataTypes.STRING,
    },
    Localidad: {
      type: DataTypes.STRING,
    },
    Numero: {
      type: DataTypes.INTEGER,
    },
    codpos: {
      type: DataTypes.STRING(15),
    },
    latitud: {
      type: DataTypes.FLOAT,
    },
    longitud: {
      type: DataTypes.FLOAT,
    },
    telefono: {
      type: DataTypes.STRING(15),
    },
  },
  {
    sequelize,
    modelName: 'DatosComplementarios',
    tableName: 'datoscomplementarios',
    timestamps: false,
  }
);

module.exports = DatosComplementarios;
