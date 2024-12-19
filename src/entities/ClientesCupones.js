const { DataTypes, Model } = require("sequelize");
const sequelize = require('../../config/database')

class ClientesCupones extends Model {}

ClientesCupones.init({
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'id_cliente',
        },
    },
    id_cupon: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cupones',
            key: 'id_cupon',
        },
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
},
{
    sequelize,
    tableName: 'clientes_cupones',
    modelName: 'ClientesCupones',
    timestamps: false
}
)


module.exports = ClientesCupones