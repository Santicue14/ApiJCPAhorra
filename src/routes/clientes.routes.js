const express = require('express')
const authMiddleware = require('../auth/authMiddleware')
const ClienteController = require('../controllers/ClienteController')
const router = express.Router()

router.post('/cargardatos',authMiddleware,ClienteController.cargarDatosComplementarios)

module.exports = router