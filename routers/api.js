const express = require("express")
const router = express.Router()
const api = {users : require("../api/users"), passwords : require("../api/passwords")}

router.get("/api/users/me", (req, res) => {
    res.json(api.users.me(req, res))
})

router.post("/api/users/new", (req, res) => {
    res.json(api.users.new(req, res))
})

router.get("/api/passwords/encode", (req, res) => {
    if(req.query.content && req.query.password){
        res.json(api.passwords.encrypt(req.query.content, req.query.password))
    }
})

module.exports = router