const path = require("path");
const fs = require("fs");

class Logger {
    constructor(logFolder,logFile){
        this.logFolder = logFolder,
        this.logFile = logFile,
        this.folderPath = path.join(process.cwd(),this.logFolder),
        this.filePath = path.join(this.folderPath,this.logFile);        

        if(!fs.existsSync(this.folderPath)){
            fs.mkdirSync(this.folderPath, { recursive: true });
        }
    }

    log(level,message){
        const timestamp = new Date().toISOString();
        const msg = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
        try {
            fs.appendFileSync(this.filePath,msg);
        } catch (err) {
            console.error('Failed to write to log file:', err);
        }        
    }
    info(message){
        this.log("info",message)
    }
    
    error(message) {
        this.log('error', message);
    }

    warn(message) {
        this.log('warn', message);
    }
}

module.exports = Logger;