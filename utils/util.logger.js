import fs from "fs/promises"

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
        "server.log", 
        logString + "\n", 
        (err) => {
            if(err) console.log(err.name + " " + err.message + "\n")
    })
}

export default logger