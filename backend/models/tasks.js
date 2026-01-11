import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    // Every task belongs to exactly one user (so your dashboard is multi-user safe).
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },
    taskName:{
        type:String,
        required:true
    },
    // Helps us build simple "Active / Completed" filters in the UI.
    completed: {
        type: Boolean,
        default: false,
        index: true,
    },
},{
    timestamps:true
})

// A tiny text index for search (q=...) on taskName.
taskSchema.index({ taskName: "text" });

const task = mongoose.model("task",taskSchema)
export default task;