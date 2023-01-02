const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    }, 
    password: {
        type: String,
        require: true
    }
})

const user = mongoose.model("User", userSchema)

module.exports = user;