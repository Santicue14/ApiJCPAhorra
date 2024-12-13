const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Usuario extends Model {}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_negocio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_de_baja: {
      type: DataTypes.DATE,
    },
    id_rol: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'ACTIVO'
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: false,
  }
);

module.exports = Usuario;
