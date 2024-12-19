const jwt = require('jsonwebtoken')
const Usuario = require('../entities/Usuario')
const Cliente = require('../entities/Cliente')

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.cookies?.token?.token  || req.header('Authorization')?.replace('Bearer ','')
        if(!token){return res.status(401).json({message:'Error, token no encontrado, autorización denegada'})}
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        let user = null
        if(decoded.role){
            user = await Usuario.findByPk(decoded.id)
            if(user){
                req.user = {
                    id: user.id_usuario,
                    role: user.id_rol,
                    id_negocio: user.id_negocio
                }
                return next()
            }
        }
        user = await Cliente.findByPk(decoded.id)
        if(user){
            req.user = {
                id: user.id_cliente,
                role: 'cliente',
            }
            return next()
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:'Error del servidor'})
    }
}

module.exports= authMiddleware;