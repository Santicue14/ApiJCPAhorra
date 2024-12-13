const expresss = require('express')
const NegocioController = require('../controllers/NegocioController')
const router = expresss.Router()

router.post('/crearnegocio',NegocioController.crearNegocio)

module.exports = router