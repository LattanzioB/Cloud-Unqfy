var winston  = require('winston');
var { Loggly } = require('winston-loggly-bulk');

class LogglyModel{


    constructor(){
        this._state = true;
        winston.add(new Loggly({
            token: "787f4764-9d8d-48e0-84f9-d8b36e444029",
            subdomain: "LattanzioB",
            tags: ["Winston-NodeJS"],
            json: true
        }));
    }

    logg(){
        console.log("llegue log2")
        winston.log('info', "Hello World from Node.js!");
    }
    
    log(status, message){
        if(this._state){
            console.log("llegue log")
            winston.log(`${status}`, `${message}`);
        }
    }

    activate(){
        this._state = true;
    }

    deactivate(){
        this._state = false;
    }

}

module.exports = {
    LogglyModel,
}
