const express = require('express');
const {GlobalUserController} = require('../controllers/GlobalUserController');

const router = express.Router();

router.post('/register', GlobalUserController.register);

module.exports = router;
