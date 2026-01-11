import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = mongoose.model("user",userSchema)

export default user;