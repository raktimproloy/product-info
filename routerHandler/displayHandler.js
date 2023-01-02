const express = require("express")
const item = require("../Schemas/itemSchema")
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        item.find(async (err, item) => {
            if(!err && item.length > 0){
                res.render("display",{
                    "userName": req.userName,
                    "item": item,
                    "message": "Available"
                })
            }else{
                res.render("display",{
                    "userName": req.userName,
                    "item": item,
                    "message": "Not Available"
                })
            }
        })
    }catch(err) {
        console.log(err);
    }
})

module.exports = router;