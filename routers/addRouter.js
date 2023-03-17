const express = require('express')
const router = express.Router()
const add = require('../controllers/addController')
const login = require('../middleware/login')
const authentication = require('../middleware/authentication')
router.get('/',login,authentication,add.get)
router.post('/',login,authentication,add.post)
module.exports = router