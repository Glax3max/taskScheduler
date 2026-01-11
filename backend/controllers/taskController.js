import task from "../models/tasks.js"

export const showAllTasks = async (req,res)=> {
    const allTasks = await task.find({});
    return res.send({
        allTasks
    })
}

export const createNewTask = async (req,res)=> {
    const {taskName} = req.body;
    try{
        await task.create({
            taskName
        })
    }catch(err) {
        return res.status(400).json({message:"Error occured during task creation"})
    }

    return res.status(200).json(taskName)
}