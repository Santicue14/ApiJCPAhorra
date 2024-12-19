const Negocio = require("../entities/Negocio")
const Roles = require("../entities/Roles")
const Usuario = require("../entities/Usuario")
const ClientesCupones = require('../entities/ClientesCupones')
const Cupones = require("../entities/Cupones")
const bcrypt = require('bcrypt')

const tokensValidos = {}

const NegocioController = {
    crearNegocio: async(req,res) =>{
        const {nombre_Negocio,email, password, direccion_Negocio, referente, telefono_ref,id_categoria, latitud, longitud, descripcion} = req.body
        try {
            // const negocioExiste = await Negocio.findOne({where: direccion_Negocio})
            // if(negocioExiste){return res.status(400).json({message: 'El negocio ya existe'})}

            const newNegocio = await Negocio.create({
                nombre_Negocio,
                direccion_Negocio,
                referente,
                telefono_ref,
                id_categoria,
                latitud,
                longitud,
                descripcion
            })


            const hashedPassword = await bcrypt.hash(password,10)


            const usuarioAdmin = await Usuario.create({
                email,
                password: hashedPassword,
                id_negocio: newNegocio.id_negocio,
                id_rol: 1,
            })

            return res.status(200).json({message:`Felicidades, ${nombre_Negocio} se creó con éxito, tu usuario administrador es: ${usuarioAdmin.email}`})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:'Error del server al crear tu negocio'})
        }
    },
    crearCupon: async(req,res)=>{
        try {
            const {porcentaje_descuento, valor, cantidad_de_cupones, fecha_inicio, fecha_fin, vigencia} = req.body
            console.log(req.user);

            const {id_negocio} = req.user
            let cupon = null
            if(porcentaje_descuento){
                cupon = await Cupones.create({id_negocio,porcentaje_descuento, cantidad_de_cupones, fecha_fin})
            }
            
            if(valor){
                cupon = await Cupones.create({id_negocio,valor,cantidad_de_cupones,fecha_fin,vigencia})
            }

            return res.status(200).json({message: 'Cupón creado con éxito', cupon})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Error al crear el cupón'})
        }
    },
    validarTokenYCanjearCupon: async(req,res)=>{
        try {
            const {token, id_cliente, id_cupon} = req.body
            if(!tokensValidos[token]){return res.status(400).json({message: 'Tóken inválido o expirado'})}

            await ClientesCupones.create({
                id_cliente,
                id_cupon,
                fecha_asignacion: new Date()
            })

            delete tokensValidos[token]

            return res.status(200).json({message: 'Token canjeado con éxito'})

        } catch (error) {
            
        }
    }
}

module.exports = NegocioController