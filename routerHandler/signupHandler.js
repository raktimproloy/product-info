const express = require("express")
const router = express.Router();

router.get("/:error", (req, res) => {
    console.log("Akhane");
})

router.get("/", (req, res) => {
    res.render("signup", {
        error: req.query.error ? "Email already used!" : ""
    })
})



module.exports = router;