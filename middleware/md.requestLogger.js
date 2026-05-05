import logger from "../utils/util.logger.js";

function requestLogger(req, res, next){
    logger.info(
        "Method: " +
        req.method + "\n" +
        "URL: " + 
        req.url + "\n"
    )
    next()
}

export default requestLogger