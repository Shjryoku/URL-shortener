import express from "express"
import controller from "./url.controller.js"

const router = express.Router()

router.post('/shorten', controller.getShortURL)
router.get('/:shortCode', controller.getOriginalURL)

export default router