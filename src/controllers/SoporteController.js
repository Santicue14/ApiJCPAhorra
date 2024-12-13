const Roles = require("../entities/Roles")
const NegocioCategoria = require("../entities/NegocioCategoria")

const SoporteController ={
    crearRol: async(req,res)=>{
        try {
            const {descripcion} = req.body
            const nuevoRol = await Roles.create({descripcion})
            return res.status(200).json({message:`Rol ${nuevoRol.descripcion} creado con éxito`})
        } catch (error) {
            return res.status(500).json({message: 'Error al creal el nuevo rol'})
        }
    },
    crearCategoria: async(req,res)=>{
        try {
            const {Tiponegocio} = req.body
            const nuevaCategoria = await NegocioCategoria.create({
                Tiponegocio
            })
            return res.status(200).json({message: 'Categoría creada con éxito', nuevaCategoria})
        } catch (error) {
            return res.status(500).json({message:'Error al crear categoría'})
        }
    }
}

module.exports = {SoporteController}