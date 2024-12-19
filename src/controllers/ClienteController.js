const Cliente = require("../entities/Cliente")
const Cupones = require("../entities/Cupones")
const DatosComplementarios = require("../entities/DatosComplementarios")
const generarToken = require("../utilities/generateToken")

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
    },
    listarCupones: async(req,res)=>{
        try {
            const cupones = await Cupones.findAll()
            if(cupones.length>0){
                return res.status(200).json(cupones)
            }   
            return res.status(200).json({message:'La consulta se ejecutó correctamente pero no hay cupones disponibles'})
        } catch (error) {
            return res.status(500).json({message:'No se han podido listar los cupones por un error del servidor'})
        }
    },
    seleccionarCupon : async(req,res)=>{
        try {
            const {id_cupon} = req.params
            const cliente = req.user

            const cupon = await Cupones.findByPk(id_cupon)
            if(!cupon){return res.status(404).json({message: 'Cupón no encontrado'})}

            const token = generarToken()

            return res.status(200).json({
                message: 'Proporcione este token el administrador del negocio',
                token
            })

        } catch (error) {
            return res.status(500).json({message: 'Error al seleccionar el cupón'})
        }
    }
}

module.exports = ClienteController;