const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api");
const app=express();

app.use(express.json());
app.use(cors())
app.get("/api",apiRoutes)
app.listen(process.env.port,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})