const express = require('express')
const router = express.Router()
const register = require('../controllers/registerController')
router.get('/',register.get)
router.post('/',register.post)
module.exports = router