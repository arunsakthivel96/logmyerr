# LogMyErr

LogMyErr JS Module enables write logs  in log file or text file in server side.

Features:

* Uses the custom log message  to output information and write log to the text file of log file/ in custom extention.
* Exception Handler allows us to handle exception from the route file in MVC.

Please report bugs there [on Github](https://github.com/arunsakthivel96/logmyerr/issues).

--------


### Implementing Logger and Custom Logger

    const {logger} = require('logmyerr');
    logger.write("Hello, World");
    
  * logger will creates a `log` directory in your local folder and create it automatically create a folder log with `logmyerr-dd-mm-yy.log` format in base project directory
  * `logger.write` this mothods takes different parameters.
  
       - `message` - required paramanter, This takes your message or a information. type : `String`, default value : `No`
       - `type` - optional paramanter, it can accecpt only the `Info`/`error`/`warn`/`debug`. type : `String`, default value : `info`
            - Example 
                1) `logger.LOGTYPE.info`
                2) `logger.LOGTYPE.error`
                3) `logger.LOGTYPE.warn`
                4) `logger.LOGTYPE.debug`
       - `priority` - optional paramanter, it can accecpt only the `critical`/`informative`/`major`. type : `String`, default value : `informative`
            - Example
                1) `this.PRIORITY.critical`
                2) `this.PRIORITY.informative`
                3) `this.PRIORITY.major`
             
OR 

    const {customLogger} = require('logmyerr');
    const logger = customLogger.getInstance();
    logger.write("Hello, World");

### Instanciation options

