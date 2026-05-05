import rateLimit from "express-rate-limit"

const limitter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "Too much requests, try later"
})

export default limitter