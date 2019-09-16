const express = require("express")
const app = express()
const mongo = require("mongoose")

// setup variables
require("dotenv").config({path : "variables.env"})

//adding body-parser  cors and cookies
app.use(require("body-parser").json())
app.use(require("body-parser").urlencoded())
app.use(require("cors")())
app.use(require("cookie-parser")(process.env.PASS));

//conect to the db and let it work
mongo.connect(process.env.DB_LOGIN)
//make sure db stuff works
require("./models/user")
require("./models/token")



//make sure ejs works
app.set('view engine', 'ejs');

//just using some routers
app.use(require("./routers/css"))
app.use(require("./routers/logging"))
app.use(require("./routers/main"))
app.use(require("./routers/js"))


//start the server
app.listen(process.env.PORT, () => {console.log(`Server staring up on ${process.env.PORT}`)})