import express from "express"
import controller from "./url.controller.js"

const router = express.Router()

router.post('/shorten', controller.createShortURL)
router.get('/:shortCode', controller.restrictOriginalURL)

export default router