const express = require("express")
const router = express.Router();
const user = require("../Schemas/userSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const queryString = require("querystring")

router.post("/", async (req, res) => {
    try{
        user.find({email:req.body.email}, async (err, data) => {
            if(!err && data.length > 0){
                const passMatched = await bcrypt.compare(req.body.password, data[0].password)
                if(passMatched){
                    const token = jwt.sign({
                        userName: data[0].name,
                        userEmail: data[0].email
                    }, process.env.JWT_SECRET, {
                        expiresIn: "1h"
                    })
                    res.cookie("htmlEcheckToken", token)
                    res.redirect("/display")
                }else{
                    const errorQuery = queryString.stringify({
                        "error": "auth"
                    })
                    res.redirect("/?" + errorQuery)
                }
            }else{
                const errorQuery = queryString.stringify({
                    "error": "auth"
                })
                res.redirect("/?" + errorQuery)
            }
        })
    }catch(err) {
        console.log(err);
    }
})

module.exports = router