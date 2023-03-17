
const BLLsanpham = require('../models/BLLsanpham')
const sanpham = require('../models/sanpham')
class update
{
    async get(req,res)
    {
        BLLsanpham.mySingleton.getInstance().getSanPhamByID(req.params.id).then(data=>
            {
                res.render('updateMoHinh',{data})
            })
        
    }
    async patch(req,res)
    {
        let sp = new sanpham(req.params.id,req.body.name,req.body.discription,req.body.kind,req.body.price,req.body.img)
       BLLsanpham.mySingleton.getInstance().updateSanPham(sp).then(log=>
        {
            res.redirect('/anime')
        }
       ).catch(err=>
        {
            res.sendStatus(err)
        })
        
    }
}
module.exports = new update