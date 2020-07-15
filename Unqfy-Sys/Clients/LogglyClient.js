const rp = require('request-promise');

class LogglyClient{

    notify(_status, _message) {
        console.log("llegue")
        const options = {
        url: `http://localhost':8082/api/newLog/`,
        qs: {
            status: _artistId,
            message: _message
            }
        }
        rp.post(options);
    }
}

module.exports = {
    LogglyClient
};