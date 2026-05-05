import mongoose from "mongoose"
import urlCounter from "./url.counter.js";
import toBase62 from "../utils/util.to.base62.js"
import fromBase62 from "../utils/util.from.base62.js"
import logger from "../utils/util.logger.js";

class urlService{
    constructor(userModel){
        this.userModel = userModel
    }

    async createShortURL(longURL){
        if(!longURL.startsWith("http://") && !longURL.startsWith("https://")) {
            longURL = "https://" + longURL
            logger.info("URL normalized to HTTPS")
        }
        try {
            new URL(longURL)
        } catch (err) {
            logger.error(err.stack)
            throw new Error("Invalid URL format")
        }
        
        const counter = await urlCounter.findByIdAndUpdate(
            "url",
            { 
                $inc: {seq: 1},
            },
            {
                new: true,
                upsert: true
            }
        );

        const data = {
            _id: counter.seq,
            originalURL: longURL
        }

        try{
            const res = await this.userModel.create(data)
            logger.info(`Short URL Created: ${res._id}`)
            return toBase62(res._id)
        } catch(err){
            logger.error(err.stack)
            if(err.code === 11000)
                throw new Error("Short URL already exists (duplicate key)")
            if(err.name === "ValidationError")
                throw new Error("Invalid URL data")
            if(err.name === "CastError")
                throw new Error("Invalid ID type")

            throw new Error("Database error: " + err.message)
        }
    }

    async restrictOriginalURL(shortCode){
        const id = fromBase62(shortCode)
        if(!Number.isInteger(id) || id < 0) { 
            logger.warn(`Invalid shortCode attempt: ${shortCode}`)
            throw new Error("Invalid shortCode") 
        }

        try{
            const data = await this.userModel.findByIdAndUpdate(
                id,
                { $inc: {clicks: 1}},
                { new: true }
            )
            logger.info(`URL resolved: ${shortCode}`)
            if(!data){
                logger.warn(`ShortCode not found: ${shortCode}`)
                throw new Error("URL not found")
            } 
            return data.originalURL
        }
        catch (err) {
            logger.error(err.stack)
            throw new Error("Failed to fetch URL: " + err.message)
        }
    }
}

export default urlService