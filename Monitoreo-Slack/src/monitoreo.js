const rp = require('request-promise');

const { MultipleClients } = require("./clients.js");


class Monitoreo {

    constructor(){
        this._clients = new MultipleClients() 
    }
    stateOfLoggly(){
        
        return this._clients.loggly().then(prom => "Service On").catch(e => "Service Off") 
    }
    stateOfUnqfy(){
        
        return this._clients.unqfy().then(prom => "Service On").catch(e => "Service Off")  
    }
    stateOfNotification(){

        return this._clients.notification().then(prom => "Service On").catch(e => "Service Off")
    }
}

module.exports = {
    Monitoreo
};