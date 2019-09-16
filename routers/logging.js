const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require("winston");
var files = fs.readdirSync(path.join(process.cwd(), '/logs'));
const api = {users : require("../api/users"), passwords : require("../api/passwords")}

const getId = (r) => {
    if(!r){var result = 00001;} else{var result = r}
    if (!files.includes(result + ".log")){
        return result
    }
    else{
        return getId(result+1)
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
    next()
})

//add error pages

router.use(function(err, req, res, next) {
    // Do logging and user-friendly error message display
    console.error(err);
    res.status(500).send('internal server error');
  })

router.use((err, req, res, next) => {
    console.log("hi")
    logger.log(err, req, res, next)
    if(err){
    console.log(err)
    res.render('./pages/error.ejs', {title: '404: Page Not Found'});
    }
    next()
});

//thought i might include this here, blocking too many request

module.exports = router