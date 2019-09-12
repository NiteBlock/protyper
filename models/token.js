const mongo = require("mongoose")
const Schema = mongo.Schema

const config = {
    token : String,
    createdAt : {
        type:Date, default: Date.now()
    }
}

const token = new Schema(config)

module.exports = mongo.model("token", token, "tokens")