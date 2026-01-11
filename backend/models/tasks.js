import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const task = mongoose.model("task",taskSchema)
export default task;