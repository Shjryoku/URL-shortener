import express from "express"
import router from "./urls/url.router.js"
import requestLogger from "./middleware/md.requestLogger.js"
import limitter from "./middleware/md.rateLimitter.js"

const app = express()

app.use(express.json())
app.use(requestLogger)
app.use(limitter)
app.use('/', router)

export default app