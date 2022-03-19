#!/usr/bin/env node

"use static";

const fs = require("fs"); // File System
const path = require("path"); // Path Manipulation

basepath = `${path.resolve(__dirname, "../../")}\\`;

// private Singleton instance of the class
class PrivateSingleton {

    constructor(config) {
      this.message = {
        Date: new Date().toISOString(),
        type: "",
        message: "" || [],
      };
     
      if(Object.keys(config).length == 0) {config = this.defaultConfig};
      if(Object.keys(config).length > 0) {this.config = config}; 

      if(Object.keys(this.config).length < 4) {
        this.config.logFileName = config.logFileName || this.defaultConfig.logFileName;
        this.config.logFileExtension = config.logFileExtension || this.defaultConfig.logFileExtension;
        this.config.logFilePath = config.logFilePath || this.defaultConfig.logFilePath;
        this.config.logFolderName = config.logFolderName || this.defaultConfig.logFolderName;
      }

      if(this.isEmpty(this.config.logFilePath) ) {this.config.logFilePath = this.defaultConfig.logFilePath;}
      if(this.isEmpty(this.config.logFileName) ){this.config.logFileName = this.defaultConfig.logFileName;}
      if(this.isEmpty(this.config.logFileExtension) && typeof(this.config.logFilePath) != "string"){this.config.logFileExtension = this.defaultConfig.logFileExtension;}
      if(this.isEmpty(this.config.logFolderName) ){this.config.logFolderName = this.defaultConfig.logFolderName;}
      // Check it contains . in the string and if not add it
      if(this.config.logFileExtension.indexOf(".") == -1) {this.config.logFileExtension = `.${this.config.logFileExtension}`;}
    }    
    defaultConfig = {
        logFileName: "logmyerr" ,
        logFileExtension: ".log",
        logFilePath: basepath,
        logFolderName: "logs",
    }
    // Check if the string is empty or null or undefined
    isEmpty(str) {
      return (!str || 0 === str.length);
    }
    // public method
    write = (message, type = this.LOGTYPE.info, priority = this.PRIORITY.informative) => {

    let path =`${this.config.logFilePath}\\${this.config.logFolderName}\\${this.config.logFileName}-${new Date().toISOString().slice(0, 10)}.${this.config.logFileExtension}`;
    let folder = `${this.config.logFilePath}\\${this.config.logFolderName}\\`;

    // Check if the folder exists
    if(!fs.existsSync(folder)){
        fs.mkdirSync(folder, { recursive: true });
    }

    let data = `==============================================================================================\n`;
    data += `Date : ${this.message.Date} \ntype : ${type} \nPriority : ${priority} \nmessage : ${message} \n`;
    data += `==============================================================================================\n`;

    if(!fs.existsSync(path))  fs.writeFileSync(path, data);

    fs.appendFile(
      `${path}`,
      `${data}\n`,
      (err) => {
        if(err) console.log(err);
      }
    );

  };

  LOGTYPE ={
    info: "info",
    error: "error",
    warn: "warn",
    debug: "debug",
  };
  
  PRIORITY= {
    critical: "critical",
    informative: "informative",
    major: "major",
  };
  
}  

class Logger {
    constructor() {
      throw new Error("Use Singleton.getInstance()");
    }
    static getInstance(config={}) {
      if (!Logger.instance) {
        Logger.instance = new PrivateSingleton(config);
      }
      return Logger.instance;
    }
    
  }
module.exports = Logger;
  