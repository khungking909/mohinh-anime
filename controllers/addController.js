const BLLsanpham = require('../models/BLLsanpham')
const sanpham = require('../models/sanpham')
class add
{
    async get(req,res)
    {
        res.render('addMoHinh')
    }
    async post(req,res)
    {
        let sp = new sanpham(req.body.id,req.body.name,req.body.discription,req.body.kind,req.body.price,req.body.img)
        BLLsanpham.mySingleton.getInstance().addSanPham(sp).then(response=>
            res.render('addMoHinh',{response:response})
        ).catch(err=>
            {
                res.render('addMoHinh',{response:"That Bai"})
            })

    }
}
module.exports = new add