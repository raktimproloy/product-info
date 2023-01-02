const express = require("express")
const item = require("../Schemas/itemSchema")
const router = express.Router();

router.get("/:id", (req, res) => {
    item.find({_id: req.params.id}, (err, itemData) => {
        res.render("details", {
            userName: req.userName,
            itemData
        })
    })
})

module.exports = router;