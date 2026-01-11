import express from "express"
import {createNewTask, showAllTasks} from "../controllers/taskController.js"
const router = express.Router()


router.get("/",showAllTasks);
router.post("/newTask",createNewTask)

export default router;