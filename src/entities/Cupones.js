const { DataTypes, Model } = require("sequelize");
const sequelize = require('../../config/database')


class Cupones extends Model {}

Cupones.init(
    {
        id_cupon: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
            
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        porcentaje_descuento: {
            type: DataTypes.DECIMAL(5, 2),
        },
        id_negocio: {
            type: DataTypes.INTEGER,
            references: {
                model: 'negocio',
                key: 'id_negocio',
            },
        },
        valor: {
            type: DataTypes.INTEGER,
        },
        cantidad_de_cupones: {
            type: DataTypes.INTEGER,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        fecha_fin: {
            type: DataTypes.DATE,
        },
        vigencia: {
            type: DataTypes.DATE,
        },
        estado: {
            type: DataTypes.STRING(2),
            defaultValue: 'AC'
        },
    },
    {
        sequelize,
        modelName: 'Cupones',
        tableName: 'cupones',
        timestamps: false
    }
)

module.exports = Cupones