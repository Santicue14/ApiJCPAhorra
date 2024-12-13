const express = require('express')
const {SoporteController} = require('../controllers/SoporteController')

const router = express.Router()


router.post('/roles',SoporteController.crearRol)
router.post('/categorias',SoporteController.crearCategoria)

module.exports = router