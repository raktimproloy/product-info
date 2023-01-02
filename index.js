const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const queryString = require("querystring")

const login = require("./routerHandler/loginHandler")
const loginChecker = require("./routerHandler/loginChecker")
const signup = require("./routerHandler/signupHandler")
const display = require("./routerHandler/displayHandler")
const addItem = require("./routerHandler/addItemHandler")
const details = require("./routerHandler/detailsHandler")
const checkLogin = require("./middlewares/checkLogin")

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1/html-ecommerce",)
.then(() => {
    console.log("connect Database")
})
.catch( (err) => {
    console.log(err.message)
})


app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.use("/", login)
app.use("/login", loginChecker)
app.use("/signup", signup)
app.use("/display",checkLogin, display)
app.use("/add-item",checkLogin, addItem)
app.use("/details",checkLogin, details)

// error Handler
const errorHandler = (err, req, res, next) => {
    if(err === "Authentication failure"){
        const errorQuery = queryString.stringify({
            "error": "auth"
        })
        res.redirect("/?" + errorQuery)
    }else{
        res.status(500).json({error: err})
    }
}

app.use(errorHandler)

app.listen(4000, () => {
    console.log("listening 4000!");
})