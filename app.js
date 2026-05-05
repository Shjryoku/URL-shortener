import express from "express"
import router from "./urls/url.router.js"
import requestLogger from "./middleware/md.requestLogger.js"
import limitter from "./middleware/md.rateLimitter.js"
import swagger from "./config/swagger.js"
import swaggerUI from "swagger-ui-express"

const app = express()

app.use(express.json())
app.use(requestLogger)
app.use(limitter)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger.specs))
app.use('/', router)

export default app