const express = require('express')
const router = express.Router()
const anime = require('../controllers/animeController')
const authen = require('../middleware/authen')
router.get('/animedetails/:id',authen,anime.details)
router.get('/:kind',anime.kind)
router.get('/',authen,anime.get)
module.exports = router