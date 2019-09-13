const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require("winston");
var files = fs.readdirSync(path.join(process.cwd(), '/logs'));
const api = {users : require("../api/users"), passwords : require("../api/passwords")}

const getId = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (!files.includes(result)){
        return result
    }
    else{
        return getId()
    }
}

let id = getId()
const filename = path.join(process.cwd(), `logs/${id}.log`);



try { fs.unlinkSync(filename); }
catch (ex) { }


const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.simple()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.simple()
                )
        }),
        new transports.Stream({
            stream: fs.createWriteStream(filename)
        })
    ]
})

logger.log('info', 'Hello created log files!', { 'foo': 'bar' });

console.log(`Server logging on ${id} in the logs folder.`)
//what is used for app.use
const express = require("express")
const router = express.Router()

router.use((req, res, next) => {
    //ignore api requests as they are pritty much useless to log cause its done by the game
    if (req.path.startsWith("/api/")){return}
    let c = api.users.me(req, res)
    let u = c ? `logged in with ${c.name} and the email ${c.email}` : "not logged in"

    logger.log("info", `Request made by ${req.ip} to get to ${req.path} with the ${req.method} method, ${u}.`)
})

//thought i might include this here, blocking too many request

module.exports = router