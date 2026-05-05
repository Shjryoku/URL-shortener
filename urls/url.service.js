import mongoose from "mongoose"
import urlCounter from "./url.counter.js";
import toBase62 from "../utils/util.to.base62.js"
import fromBase62 from "../utils/util.from.base62.js"
import logger from "../utils/util.logger.js";
import client from "../config/redis.js";


class urlService{
    constructor(userModel){
        this.userModel = userModel
    }

    async createShortURL(longURL){
        if(!longURL.startsWith("http://") && !longURL.startsWith("https://")) {
            longURL = "https://" + longURL
            logger.info("createShortURL: URL normalized to HTTPS")
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
            logger.info(`createShortURL: Short URL Created: ${res._id}`)
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
            logger.warn(`restrictOriginalURL: Invalid shortCode attempt: ${shortCode}`)
            throw new Error("Invalid shortCode") 
        }

        const cached = await client.get(shortCode)
        if(cached){
            logger.info("restrictOriginalURL: Got URL from Redis")
            return cached
        }

        try{
            const data = await this.userModel.findByIdAndUpdate(
                id,
                { $inc: {clicks: 1}},
                { new: true }
            )
            logger.info(`URL resolved: ${shortCode}`)
            if(!data){
                logger.warn(`restrictOriginalURL: ShortCode not found: ${shortCode}`)
                throw new Error("URL not found")
            } 
            client.set(shortCode, data.originalURL)
            return data.originalURL
        }
        catch (err) {
            logger.error(err.stack)
            throw new Error("restrictOriginalURL: Failed to fetch URL: " + err.message)
        }
    }

    async returnURLClicks(shortCode){
        const id = fromBase62(shortCode)
        if(!Number.isInteger(id) || id < 0) { 
            logger.warn(`Invalid shortCode attempt: ${shortCode}`)
            throw new Error("Invalid shortCode") 
        }

        try{
            const data = await this.userModel.findById(id)
            if(data)
                return data.clicks
            else{
                logger.error("URLClicks: data is null")
                throw new Error("URL not found")
            }
        } catch (err){
            logger.error(err.stack)
            throw new Error("URLClicks: Failed to fetch URL: " + err.message)
        }
    }
}

export default urlService