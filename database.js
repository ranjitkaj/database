const express = require("express");
const app = express();
port = 3000;

app.listen(port , ()=>{
    console.log(`app is running on port ${port}`)
})

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ranjit:Ranjit1234@cluster0.szk3lvs.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("database connected");
}).catch((e) => {
    console.log(e);
})
const Schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cpassword:String,
    date:{type: Date, default: Date.now},
    mobile:Number,
    address: String

})
const Usermodel = mongoose.model("User" , Schema);
module.exports = Usermodel;


app.get("/",(req,res)=>{
    res.send("this is homepage");
})

app.post("/",async(req,res)=>{
    const {name,email,cpassword, date, mobile,address}=req.body;
    const newuser = new Usermodel({name, email, cpassword, date, mobile,address});
    const usersave = await newuser.save();
    console.log(`usersave ${usersave}`);
    res.redirect("/");

})
