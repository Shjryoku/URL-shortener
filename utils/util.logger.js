import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logPath = path.join(__dirname, "../logs/server.log")

function info(msg) { log("INFO", msg) }
function warn(msg) { log("WARN", msg) }
function error(msg) { log("ERROR", msg) }
function debug(msg) { log("DEBUG", msg) }

async function log(level, msg){
    const entry = {
        time: new Date(),
        level,
        msg
    }

    const formatted = formatter(entry)

    toConsole(formatted)
    await toFile(formatted)
}

function formatter(entry){
    return `[${entry.time.toISOString()}] [${entry.level}] [${entry.msg}]`
}

function toConsole(log){
    console.log(log)
}

async function toFile(logString){
    fs.appendFile(
        logPath, 
        logString + "\n", 
        (err) => {
            if(err) console.log(err.name + " " + err.message + "\n")
    })
}

const logger = { info, warn, error, debug }
export default logger