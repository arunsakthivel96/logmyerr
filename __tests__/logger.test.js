const {logger} = require('../index');

logger.write("This is a test message", logger.LOGTYPE.info, logger.PRIORITY.informative);