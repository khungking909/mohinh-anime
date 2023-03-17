const express = require('express')
const router = express.Router()
const del = require('../controllers/deleteController')
const login = require('../middleware/login')
const authentication = require('../middleware/authentication')
router.delete('/:id',login,authentication,del.del)
module.exports = router