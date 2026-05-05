import app from "./app.js"
import connectDB from "./config/db.js"
import logger from "./utils/util.logger.js"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT

await connectDB()

app.listen(PORT, () => {
    logger.info("Server running on port 3000")
})