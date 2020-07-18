const rp = require('request-promise');

class LogglyClient{

    log(_status, _message) {
        console.log("llegue")
        const options = {
        url: `http://localhost:8082/api/newLog/`,
        qs: {
            status: _status,
            message: _message
            }
        }
        rp.post(options);
    }

    activate(){
        console.log("llegue")
        const options = {
        url: `http://localhost:8082/api/activate/`
        }
        rp.post(options);
    }

    deactivate(){
        console.log("llegue")
        const options = {
        url: `http://localhost:8082/api/deactivate/`
        }
        rp.post(options);
    }
}

module.exports = {
    LogglyClient
};