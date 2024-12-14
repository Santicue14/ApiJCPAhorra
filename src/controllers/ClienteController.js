const Cliente = require("../entities/Cliente")
const DatosComplementarios = require("../entities/DatosComplementarios")

const ClienteController = {
    cargarDatosComplementarios: async (req,res)=>{
        try {
            const {nombre,apellido,dni,calle,Localidad,numero,codpos,telefono} = req.body   
            const dniExiste = await DatosComplementarios.findOne({where:  {dni}})
            if(dniExiste){return res.status(402).json({message: 'El dni ya está registrado'})}

            
            const usuario = req.user
            const cliente = await Cliente.findByPk(usuario.id)
            if(cliente && cliente.id_datos_complementarios){
                return res.status(400).json({message: 'Ya tenés tus datos registrados!'})
            }
            const datosComplementarios = await DatosComplementarios.create({
                nombre,apellido,dni,calle,Localidad,numero,codpos,telefono
            })
            await cliente.update({ id_datos_complementarios: datosComplementarios.id_datos_complementarios });
            return res.status(200).json({message:'Datos registrados con éxito'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Error al cargar datos complementarios'})
        }
    }
}

module.exports = ClienteController;