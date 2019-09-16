//used for returning /css/main.css and others!
const express = require("express")
const router = express.Router()

router.get("/css/main.css", (req, res) => {res.status(200).sendFile(__dirname  + "/css/main.css")})
router.get("/css/login.css", (req, res) => {res.status(200).sendFile(__dirname  + "/css/login.css")})

module.exports = router