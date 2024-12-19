const crypto = require('crypto')
const Cupon = require('../entities/Cupones')

const generarToken = ()=>{
    return crypto.randomBytes(3).toString('hex')
}

module.exports = generarToken