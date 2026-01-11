import express from "express"
import allRouter from "./ApiV1/apiV1.js"
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:false}))


// routing
app.use("/api/v1",allRouter)

export default app;