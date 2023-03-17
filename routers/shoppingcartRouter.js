const express = require('express')
const router = express.Router()
const shopping = require('../controllers/shoppingController')
const authen = require('../middleware/authen')
router.post('/:id',authen,shopping.post)
router.delete('/:id',shopping.del)
router.get('/',authen,shopping.get)
module.exports = router