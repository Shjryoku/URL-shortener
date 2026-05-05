import Redis from "ioredis";
import logger from "../utils/util.logger.js";

const client = new Redis(process.env.REDIS_URI)

client.on("connect", () => logger.info("Redis connected"))
client.on("error", (err) => logger.error(err.message))

export default client