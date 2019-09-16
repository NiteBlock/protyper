const mongo = require("mongoose")
const user = mongo.model("user")
const token = mongo.model("token")
const md5 = require('md5-hex');
const api = { users: require.main, passwords: require("./passwords") }
const Regex = require("regex")
require("dotenv").config({ path: "variables.env" })

module.exports.me = (req, res) => {
    if (!req.cookies || !req.query || !req.body) {
        return undefined
    }

    let result = undefined
    if (req.cookies) {
        if (req.cookies.token) {
            token.find({ token: req.cookies.token }).then((data) => {
                user.find({ id: data.forUser }).then((data) => {
                    result = (data.length == 1) ? data[0] : undefined
                })
            })
        }
    } if (req.query) {
        if (req.query.token) {
            token.find({ token: req.query.token }).then((data) => {
                user.find({ id: data.forUser }).then((data) => {
                    result = (data.length == 1) ? data[0] : undefined
                })
            })
        }
    } if (req.body) {
        if (req.body.token) {
            token.find({ token: req.body.token }).then((data) => {
                user.find({ id: data.forUser }).then((data) => {
                    result = (data.length == 1) ? data[0] : undefined
                })
            })
        }
    }
    x = result
    if (x) {
        x.md5Email = md5(x.email)
        x.avatarUrl = (size) => { if (!size) { letsize = 1024 }; return `https://www.gravatar.com/avatar/${x.md5Email}.png?size=${size}` }
        return true
    } else {
        return undefined
    }
}



//just make some list of charecters
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

module.exports.new = (req, res) => {
    if (req.body.name && req.body.password && req.body.email) {
        let pass = req.body.password instanceof Array ? req.body.password : (req.body.password instanceof String ? api.passwords.encrypt(req.body.password, process.env.PASS) : req.body.password)
        let name = ""
        for (let i = 0; i < req.body.name.length; i++) {
            let letter = req.body.name.charAt(i)
            if (letter == " " || letter == "_" || letter == "-") {
                if (name.length == 0 ? false : name.charAt(name.length) != "-" || name.charAt(name.length) != "_") {
                    name += letter != " " ? letter : "_"
                }
            } else if (characters.includes(letter)) {
                name += letter
            }
        }
        if (!name) { return undefined }
        let emailRegEx = new Regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/)
        let email = emailRegEx(req.body.email) ? req.body.email : undefined
        if (!email) { return undefined }
        let id = Math.floor(Math.random() * 100000000)
        let newUser = new user({
            email: email,
            id: id,
            pass: pass,
            name: name,
            verified: false,
            ips: [req.ip],
            stats: {},
            achivements: []
        })
        let r = {}
        newUser.save().then(data => {
            if (data) {
                r = id
            } else {
                r = undefined
            }
        })
        return r
    }
}

module.exports.genToken = (req, res) => {
    function makeToken() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 96; i++) {
            if (24 % i == 0) { result += "." } else {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        return result;
    }
    if (!req.body) { return undefined }
    if (req.body.name && req.body.password) {
        newToken = makeToken()
        let name = req.body.name
        let password = api.passwords.encrypt(req.body.password, process.env.PASS)
        user.find({ name: name, password: password }).then(data => {
            new token({ token: newToken, forUser: data.id }).save().then(worked => { if (!worked) { return undefined } })
        })
        return newToken
    }
    return undefined
}

module.exports.addToken = (req, res) => {
    newToken = module.exports.genToken(req, res)
    if (newToken) {
        let remember = req.body.remeber
        if (!remember) { res.cookie('login-token', token, { expires: new Date(Date.now() + 900000) }); }
        else { res.cookie("login-token", token) }
    } else{
        res.send("error")
    }
}