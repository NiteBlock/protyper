const mongo = require("mongoose")
const Schema = mongo.Schema


const config = {
    token : String,
    forUser : {
        type : Number,
        required : false
    },
    forGame : {
        type : Number,
        required : false
    },
    forGroup : {
        type : Number,
        required : false
    },

    createdAt : {
        type:Date, default: Date.now()
    }
}

const token = new Schema(config)

module.exports = mongo.model("token", token, "tokens")