import express from "express"
import controller from "./url.controller.js"

const router = express.Router()

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Shorten a URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Short code created
 */

router.post('/shorten', controller.getShortURL)

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: URL of shortCode
 *     parameters:
 *        - in: path
 *          name: shortCode
 *          required: true
 *          schema:
 *              type: string
 *     responses:
 *       200:
 *         description: Got Original URL
 */

router.get('/:shortCode', controller.getOriginalURL)

/**
 * @swagger
 * /{shortCode}/clicks:
 *   get:
 *     summary: Clicks of URL
 *     parameters:
 *        - in: path
 *          name: shortCode
 *          required: true
 *          schema:
 *              type: string
 *     responses:
 *       200:
 *         description: Got URL Clicks
 */

router.get('/:shortCode/clicks', controller.getURLClicks)

export default router