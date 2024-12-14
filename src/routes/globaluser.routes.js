const express = require('express');
const {GlobalUserController} = require('../controllers/GlobalUserController');

const router = express.Router();

router.post('/register', GlobalUserController.register);
router.post('/login', GlobalUserController.login);

module.exports = router;
