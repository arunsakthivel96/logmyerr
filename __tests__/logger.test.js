const {logger} = require('../index');
let message = "This is a test message";

test(message,()=>{
    expect(1+1).toBe(2);
});
