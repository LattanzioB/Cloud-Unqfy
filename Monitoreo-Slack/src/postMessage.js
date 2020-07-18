const rp = require('request-promise');



class Monitoreo{

  log(_status, _message) {
    console.log("llegue")
    const options = {
    url: `https://hooks.slack.com/services/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`,
    qs: {
        status: _status,
        message: _message
        }
    }
    rp.post(options);
  }

}

//
