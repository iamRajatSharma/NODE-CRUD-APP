const express = require("express")
const app = express()
const PORT = 1234
require("./DB/conn")
const Users = require("./DB/User")
const bodyParser = require("body-parser")

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// display index page and data
app.get("/", async (req, res) => {
    const data = await Users.find({})
    res.render("index", { "data": data })
})

// display add new user page
app.get("/add", (req, res) => {
    res.render("add")
})

// display edit page with pref-fill data
app.get("/edit/:id", async (req, res) => {
    let data = await Users.findOne({ _id: req.params.id })
    res.render("edit", { "data": data })
})

// save new user
app.post("/save", async (req, res) => {
    let data = await Users(req.body)
    data = await data.save();
    if (data) {
        res.redirect("/")
    }
})

// update and save new data
app.post("/update/:id", async (req, res) => {
    console.log(req.params.id)
    let data = await Users.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    console.log(req.params.id)
    if (data) {
        res.redirect("/")
    }
})

// delete data
app.get("/delete/:id", async (req, res) => {
    let data = await Users.deleteOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        res.redirect("/")
    }
})

// server config
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port ${PORT}`)
    }
})
