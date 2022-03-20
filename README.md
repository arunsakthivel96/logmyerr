
# LogMyErr

LogMyErr JS Module enables write logs  in log file or text file in server side.

Features:

* Uses the custom log message  to output information and write log to the text file of log file/ in custom extention.
* Exception Handler allows us to handle exception from the route file in MVC.

Please report bugs there [on Github](https://github.com/arunsakthivel96/logmyerr/issues).

--------


### Implementing Logger and Custom Logger
```javascript
    const {logger} = require('logmyerr');
    logger.write("Hello, World");
```    
  * logger will creates a `log` directory in your local folder and create it automatically create a folder log with `logmyerr-dd-mm-yy.log` format in base project directory
  * `logger.write` this methods takes different parameters.
  
       - `message` - required parameter, This takes your message or a information. type : `String`, default value : `No`
       - `type` - optional parameter, it can accept only the `Info`/`error`/`warn`/`debug`. type : `String`, default value : `info`
            - Example 
                1) `logger.LOGTYPE.info`
                2) `logger.LOGTYPE.error`
                3) `logger.LOGTYPE.warn`
                4) `logger.LOGTYPE.debug`
	```javascript
	 loggers.write(err.stack,loggers.LOGTYPE.info);
	```

       - `priority` - optional parameter, it can accept only the `critical`/`informative`/`major`. type : `String`, default value : `informative`
            - Example
                1) `this.PRIORITY.critical`
                2) `this.PRIORITY.informative`
                3) `this.PRIORITY.major`
	```javascript
	 loggers.write(err.stack,loggers.LOGTYPE.info, loggers.PRIORITY.informative);
	```          
            
OR 
```javascript
    const {customLogger} = require('logmyerr');
    const logger = customLogger.getInstance();
    logger.write("Hello, World");
```    
   * In this `customLogger` it help us to change the default configuration. 
   
## Example
```javascript
    const {customLogger} = require('logmyerr');
    let defaultConfig = {
        logFileName: "logmyerr" ,
        logFileExtension: ".log",
        logFilePath: "<Your System local path or a Custom Path>", 
        logFolderName: "logs",
        }
    const logger = customLogger.getInstance(defaultConfig);
    logger.write("Hello, World");
```    
        
   * logger will creates a `logs` directory in custom local folder and create it automatically create a folder log with `logmyerr-dd-mm-yy.log` format in base project directory
  * `logger.write` this methods takes different parameters.
  
       - `message` - required parameter, This takes your message or a information. type : `String`, default value : `No`
       - `type` - optional parameter, it can accept only the `Info`/`error`/`warn`/`debug`. type : `String`, default value : `info`
            - Example 
                1) `logger.LOGTYPE.info`
                2) `logger.LOGTYPE.error`
                3) `logger.LOGTYPE.warn`
                4) `logger.LOGTYPE.debug`
                
	```javascript
	 loggers.write(err.stack,loggers.LOGTYPE.info);
	```
      - `priority` - optional parameter, it can accept only the `critical`/`informative`/`major`. type : `String`, default value : `informative`
            - Example
                1) `this.PRIORITY.critical`
                2) `this.PRIORITY.informative`
                3) `this.PRIORITY.major`
	```javascript
	 loggers.write(err.stack,loggers.LOGTYPE.info, loggers.PRIORITY.informative);
	```              
    

### Exception Handler Router based 

If you are following MVC patter in you Application you can use this exception handler to Handle all your exception from your router. Basically It will handles the all the exception from your controller. 

```javascript
let  express  =  require('express');
let  router  =  express.Router();
let {exceptionHandler} =  require('logmyerr');
const  LoginController  =  require('../controllers/login.controllers');
router.post('/', exceptionHandler(LoginController.login)); 
```     
and also it must to be implement the global exception handler in `main.js` file
## Example 
[](https://emojipedia.org/file-folder/)

### 📁 `app.js` 

```javascript
var  createError  =  require('http-errors');
var  express  =  require('express');
var  path  =  require('path');
var  cookieParser  =  require('cookie-parser');
// importing DotEnv
require('dotenv').config();
let {logger} =  require('logmyerr');
let  loginRouter  =  require('./routes/login.routes');

var  app  =  express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);

app.use(function(req, res, next) {
if(process.env.NODE_ENV ===  'development'){
next(createError(404));
}else  if(process.env.NODE_ENV ===  'Perf'){
next(createError(404));
}else{
const  err  =  new  Error('Not Found');
err.status =  404;
next(err);
}
});

// error handler
app.use(function(err, req, res, next) {
if(process.env.NODE_ENV ===  'development'){
// set locals, only providing error in development
res.locals.message =  err.message;
res.locals.error =  req.app.get('env') ===  'development'  ?  err  : {};
loggers.write(err.stack,loggers.LOGTYPE.error, loggers.PRIORITY.critical);
// render the error page
res.status(err.status ||  500);
res.json({
message: err.message,
});
}
else{
res.status (err.status ||  500);
loggers.write(err.stack,loggers.LOGTYPE.error, loggers.PRIORITY.critical);
res.json({
error: {
message: "Internal Server Error"
}
});
}
});
module.exports  =  app;
```
 
[](https://emojipedia.org/antenna-bars/)

### 📶 `router.js`
```javascript
let  express  =  require('express');
let  router  =  express.Router();
let {exceptionHandler} =  require('logmyerr');
const  LoginController  =  require('../controllers/login.controllers');
router.post('/', exceptionHandler(LoginController.login));
```
[](https://emojipedia.org/video-game/)

### 🎮 `Controller.js`
```javascript
const  LoginController  = {}
LoginController.login  = (req, res) => {
	throw  new  Error("Dummy Exception");
}
```
