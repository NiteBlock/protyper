const express = require("express")
const app = express()
//make sure db stuff works
require("./models/user")

const api = {users : require("./api/users"), passwords : require("./api/passwords")}


// setup variables
require("dotenv").config({path : "variables.env"})


app.set('view engine', 'ejs');

app.use(require("./routers/css"))
app.use(require("body-parser").json())
app.use(require("body-parser").urlencoded())
app.use(require("cors")())

app.get("/", (req, res) => {
    res.render("./pages/home.ejs", {ip : req.ip, test : "This is some testing", user:api.users.me(req,res)})
})



app.listen(process.env.PORT, () => {console.log(`Server staring up on ${process.env.PORT}`)})