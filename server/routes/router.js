const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// router.get("/",(req,res)=>{
//     console.log("connect");
// })


// register user
router.post("/create", (req, res) => {
    const { name, email, age, mobile, work, add, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !add) {
        res.status(422).json("plz fill the data");
    }

    try {
        conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist");
            } else {
                conn.query("INSERT INTO users SET ?", { name, email, age, mobile, work, add, desc }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata
router.get("/getdata", (req, res) => {
    conn.query("SELECT * FROM users",(err,result)=>{
        if(err){
            res.status(422).json("no data available");
        }else{
            res.status(201).json(result);
        }
    })
})


// get individual user
router.get("/induser/:id", (req, res) => {
    const {id} = req.params;
    conn.query("SELECT * FROM users WHERE idusers = ?",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
})

// update user data
router.patch("/updateuser/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;
    conn.query("UPDATE users SET ? WHERE idusers = ? ",[data,id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});

// delete user
router.delete("/deleteuser/:id", (req, res) => {
    const {id} = req.params;
    conn.query("DELETE FROM users WHERE idusers = ?",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
})

module.exports = router;