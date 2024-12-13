const { DataTypes, Model } =  require('sequelize')
const sequelize = require('../../config/database')

class NegocioCategoria extends Model{}

NegocioCategoria.init(
    {
        id_categoria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Tiponegocio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {sequelize,
    modelName: 'NegocioCategoria',
    tableName: 'Negocio_categoria',
    timestamps: false
}
)
module.exports = NegocioCategoria