const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Roles extends Model {}

Roles.init(
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING,
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
    modelName: 'Roles',
    tableName: 'roles',
    timestamps: false,
  }
);

module.exports = Roles;
