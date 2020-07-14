var winston  = require('winston');
var {Loggly} = require('winston-loggly-bulk');

class LogglyModel{
    constructor(){
    winston.add(new Loggly({
        token: "37405594-8831-467e-8dc6-4caf039a3f70",
        subdomain: "lattanziob",
        tags: ["Winston-NodeJS"],
        json: true
    }));
    }

    log(status, message){
        winston.log(`${status}`, `${message}`);
    }

}

module.exports = {
    LogglyModel
}
