import express from "express"

const router = express.Router();

router.get("/testUser",(req,res)=> {
    res.end("Testing user done")
})

export default router;