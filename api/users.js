const mongo = require("mongoose")
const user = mongo.model("user")
const md5 = require('md5-hex');

module.exports.me = (req, res) => {
    if (!req.cookies){
        return undefined
    }
    if (req.cookies.id) {
        user.find({ id: req.cookies.id }).then((data) => {
            return (data.length == 1) ? data[0] : undefined
        })
    }
    return undefined
}

module.exports.new = (req, res) => {
    if (req.body.name && req.body.password){
        
    }
}