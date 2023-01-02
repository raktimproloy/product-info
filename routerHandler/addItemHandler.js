const express = require("express")
const item = require("../Schemas/itemSchema")
const multer = require("multer")
const path = require("path")
const router = express.Router();

const Storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
        if(
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ){
            cb(null, true)
        } 
    }
}).single('file')

router.get("/", (req, res) => {
    res.render("addItem", {
        "userName": req.userName,
        message: ""
    })

    
})
router.post("/", upload, (req, res) => {
    res.render("addItem", {
        "userName": req.userName,
        message: "Item was added.."
    })

    const newItem = new item({
        title: req.body.title,
        description: req.body.description,
        author: req.userName,
        image: req.file.filename
    })

    newItem.save();
})

module.exports = router;