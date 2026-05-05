import urlService from "./url.service.js"
import urlModel from "./url.model.js"
import logger from "../utils/util.logger.js"

const service = new urlService(urlModel)

async function getShortURL(req, res){
    try{
        const { url } = req.body
        if(!url) {
            logger.warn("Missing url in request body")
            return res.status(400).json( { error: "url is required" })
        }
        
        const shortCode = await service.createShortURL(url)
        return res.status(201).json({ shortCode })
    } catch (err) {
        logger.error(err.stack)
        return res.status(500).json({ error: "Internal server error" })
    }
}

async function getOriginalURL(req, res){
    const { shortCode } = req.params
    if(!shortCode) return res.status(400).json("Bad Request")

    try{
        const originalURL = await service.restrictOriginalURL(shortCode)
        return res.status(200).json({ originalURL })
    } catch (err){
        logger.error(err.stack)
        return res.status(500).json({ error: "Internal server error" })
    }
}

async function getURLClicks(req, res){
    const { shortCode } = req.params
    if(!shortCode) return res.status(400).json("Bad Request")

    try{
        const clicks = await service.returnURLClicks(shortCode)
        return res.status(200).json({ clicks })
    } catch(err){
        logger.error(err.stack)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const controller = { getShortURL, getOriginalURL, getURLClicks }
export default controller