const Negocio = require("../entities/Negocio")
const Roles = require("../entities/Roles")
const Usuario = require("../entities/Usuario")
const bcrypt = require('bcrypt')
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

            console.log(newNegocio);

            const usuarioAdmin = await Usuario.create({
                email,
                password: hashedPassword,
                id_negocio: newNegocio.id_negocio,
                id_rol: 0,
            })

            return res.status(200).json({message:`Felicidades, ${nombre_Negocio} se creó con éxito, tu usuario administrador es: ${usuarioAdmin.email}`})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:'Error del server al crear tu negocio'})
        }
    },

}

module.exports = NegocioController