const express = require('express')
const authMiddleware = require('../auth/authMiddleware')
const ClienteController = require('../controllers/ClienteController')
const router = express.Router()

router.post('/cargardatos',authMiddleware,ClienteController.cargarDatosComplementarios)
router.get('/cupones',authMiddleware,ClienteController.listarCupones)
router.get('/cupones/:id_cupon',authMiddleware,ClienteController.seleccionarCupon)

module.exports = router