import express from "express"
import userRoutes from "../routers/userRouter.js"
import taskRoutes from "../routers/taskRouter.js"
const router = express.Router()


router.use("/user",userRoutes)
router.use("/task",taskRoutes)

export default router;