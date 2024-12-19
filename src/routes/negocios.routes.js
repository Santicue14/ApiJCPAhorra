const expresss = require('express')
const NegocioController = require('../controllers/NegocioController')
const authMiddleware = require('../auth/authMiddleware')
const router = expresss.Router()

router.post('/crearnegocio',NegocioController.crearNegocio)
router.post('/crearcupon',authMiddleware,NegocioController.crearCupon)
router.post('/validarcupon',authMiddleware,NegocioController.validarTokenYCanjearCupon)

module.exports = router