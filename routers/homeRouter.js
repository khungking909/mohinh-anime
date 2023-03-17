const express = require('express')
const router = express.Router()
const home = require('../controllers/homeController')
const authen = require('../middleware/authen')
router.get('/',authen,home.get)

module.exports = router