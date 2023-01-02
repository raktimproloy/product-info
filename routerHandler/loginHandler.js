const express = require("express")
const user = require("../Schemas/userSchema")
const querystring = require("querystring")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router();

router.get("/", (req, res) => {
    res.cookie("htmlEcheckToken", "")
    res.render("login", {
        message: req.query.error ? "Authentication Problem..." : "" 
    })
})

router.post("/", (req, res) => {
    try{
        user.find({email: req.body.email}, async (err, data) => {
            if(!err && data.length > 0){
                const errorQuery = querystring.stringify({
                    "error": "get"
                })
                res.redirect("/signup?" + errorQuery)
            }else{
                let hashedPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new user({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                newUser.save();
                res.render("login", {
                    message: "Signup successful..."
                })
            }
        })
        
    }catch(err){
        console.log(err.message);
    }
})

module.exports = router;