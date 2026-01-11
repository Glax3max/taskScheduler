import { configDotenv } from "dotenv";
import app from "./app.js"
import connect from "./connectDB/connect.js";
configDotenv()
connect(process.env.MONGODB_URL)
app.listen(process.env.PORT,()=> {
    console.log(`Server is successfully running on Port:${process.env.PORT}`)
})