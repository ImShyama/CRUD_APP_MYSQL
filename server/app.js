require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("./db/conn")
const router = require("./routes/router");


const port = 8003;

// app.get("/",(req,res)=>{
//     res.send("server start")
// })


// middleware
app.use(express.json());
app.use(cors());
app.use(router)

// Start the server
app.listen(port,()=>{
    console.log(`server is start port number ${port}`)
})
