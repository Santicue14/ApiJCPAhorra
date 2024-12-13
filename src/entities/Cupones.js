const { DataTypes } = require("sequelize");
import sequelize from '../../config/database'


const Cupones = sequelize.define('Cupones', {
    id_cupon: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    },
    fecha_fin: {
        type: DataTypes.DATE,
    },
    vigencia: {
        type: DataTypes.DATE,
    },
    estado: {
        type: DataTypes.STRING(2),
    },
}, {
    tableName: 'cupones',
    timestamps: false,
});