const express = require('express')
const router = express.Router()
const update = require('../controllers/updateController')
const login = require('../middleware/login')
const authentication = require('../middleware/authentication')
router.get('/:id',login,authentication,update.get)
router.patch('/:id',login,authentication,update.patch)
module.exports = router