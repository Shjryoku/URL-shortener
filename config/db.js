import mongoose from "mongoose"
import logger from "../utils/util.logger.js"

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        logger.info("MongoDB connected")
    } catch (err){
        logger.error(err.message)
        throw new Error(err.message)
    }
}

export default connectDB