const mongoose = require("mongoose")

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})

const item = mongoose.model("item", itemSchema);
module.exports = item