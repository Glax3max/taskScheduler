import mongoose from "mongoose";

const connectDB = async (url) => {
    return await mongoose.connect(url).then((data)=> {
        console.log("DB connected successfully")
    }).catch((err)=> {
        console.log(err)
    })
}
export default connectDB;