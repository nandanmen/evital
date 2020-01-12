const express = require("express")
const { json, urlencoded } = require("body-parser")

const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))

app.get("/", (_, res) => res.send("Hello world!"))

app.listen(9000, () => console.log(`App running on port 9000`))
