const express = require('express');
const {GlobalUserController} = require('../controllers/GlobalUserController');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

router.post('/register', GlobalUserController.register);
router.post('/login', GlobalUserController.login);
router.post('/logout',authMiddleware,GlobalUserController.logout)

module.exports = router;
