
module.exports = async (req, res, next) => {
    if (req.cookies.token != undefined || req.user!= undefined) next()
    else res.redirect('/login')
}