const express = require("express");
const router = express.Router()
const api = {users : require("../api/users"), passwords : require("../api/passwords")}

router.get("/", (req, res) => {
    res.render("./pages/home.ejs", {ip : req.ip, test : "This is some testing", user:api.users.me(req,res)})
})

router.get("/log*n", (req, res) => {
    if(api.users.me(req,res)){
        res.redirect(api.redict.format(req))
    }
    res.render("./pages/login.ejs", {})
})

router.get("/singup", (req, res) => {
    if(api.users.me(req,res)){
        res.redirect(api.redict.format(req))
    }
    res.render("./pages/signup.ejs", {})
})

module.exports = router