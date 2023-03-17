
module.exports = async (req,res,next)=>
{
    if(req.user!=undefined)
    {
        req.auth = 'google'
        next()
    }
    else 
    {
        req.auth = 'normaluser'
        next()
    }
}