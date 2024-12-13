const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');  // Asegúrate de que la ruta sea correcta

class Cliente extends Model {}

Cliente.init(
  {
    id_cliente: {
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
    id_datos_complementarios: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    token: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_ultimo_acceso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'ACTIVO'
    },
  },
  {
    sequelize,  // Asegúrate de que la instancia de sequelize esté correctamente pasada aquí
    modelName: 'Cliente',
    tableName: 'clientes',  // Asegúrate de que el nombre de la tabla coincida con la de tu base de datos
    timestamps: false,  // Si no quieres usar campos de timestamps, puedes dejarlo como false
  }
);

module.exports = Cliente;
