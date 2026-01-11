import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        trim: true,
    },
    lname:{
        type:String,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps: true,
})

const user = mongoose.model("user",userSchema)

export default user;