const logger = require('./core/logmyerr').getInstance();
const customLogger = require('./core/logmyerr');
const exceptionHandler = require('./core/ExceptionHandler');
module.exports = {
    logger : logger,
    customLogger : customLogger,
    exceptionHandler : exceptionHandler
}