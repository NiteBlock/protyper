const mongo = require("mongoose")
const user = mongo.model("user")
const token = mongo.model("token")
const md5 = require('md5-hex');
module.exports.me = (req, res) => {
    if (!req.cookies || !req.query || !req.body){
        return {Boolean : false, error : "no"} = false
    } 
    let x = () =>{
    if (req.cookies.token) {
        
        user.find({ id: req.cookies.id }).then((data) => {
            return (data.length == 1) ? data[0] : undefined
        })
    }

    return undefined
    }
    x = x()
    if(x){
        x.md5Email = md5(x.email)
        x.avatarUrl = (size) => {if(!size){letsize=1024};return `https://www.gravatar.com/avatar/${x.md5Email}?size=${size}`}
        return x, true
    } else{
        return undefined
    }
}

module.exports.new = (req, res) => {
    if (req.body.name && req.body.password){
        
    }
}