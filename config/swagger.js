import express from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener",
            version: "1.0.0"
        }
    },
    apis: ["./urls/*.js"]
}

const specs = swaggerJSDoc(options)

const swagger = { options, specs }
export default swagger