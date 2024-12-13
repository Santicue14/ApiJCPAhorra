const { DataTypes } = require("sequelize");
import sequelize from '../../config/database'
const ClientesCupones = sequelize.define('ClientesCupones', {
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
}, {
    tableName: 'clientes_cupones',
    timestamps: false,
});