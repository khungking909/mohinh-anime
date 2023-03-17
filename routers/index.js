const login = require('../middleware/login')
const home = require('./homeRouter')
const loginRouter = require('./loginRouter')
const anime = require('./animeRouter')
const shoppingcart = require('./shoppingcartRouter')
const add = require('./addRouter')
const update = require('./updateRouter')
const del= require('./deleteRouter')
const register = require('./registerRouter')
const auth = require('./authRouter')
function router(app)
{
    app.use('/register',register)
    app.use('/auth',auth)
    app.use('/shoppingcart',login,shoppingcart)
    app.use('/anime',login,anime)
    app.use('/login',loginRouter)
    app.use('/delete',del)
    app.use('/add',add)
    app.use('/update',update)
    app.use('/',login,home)
   
}
module.exports = router