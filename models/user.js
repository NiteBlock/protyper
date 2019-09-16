const mongo = require("mongoose")
const Schema = mongo.Schema

const config = {
    name : String,
    id : Number,
    password : Array,
    email : String,
    verified : Boolean,
    createdAt : {
        type:Date, default: Date.now()
    },
    ips: Array,
    stats : Object,
    achivements : Array
}

const user = new Schema(config)

module.exports = mongo.model("user", user, "users")