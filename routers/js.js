//used for return js documents (how cool!)
const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/js/*", (req, res) => {
    try {if (fs.existsSync(__dirname + req.path)){
        res.status(200).sendFile(req.path.endsWith(".js") ? __dirname  + req.path : __dirname + req.path + ".js")
    }} catch{
        res.send("Invalid file!")
        res.send(404)
    }
})


module.exports = router