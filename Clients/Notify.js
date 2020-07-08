const rp = require('request-promise');

class Notify {

    send(emailList, _subject, _message) {
        const options = {
            url: `que url poner ?`,
            qs: {
                mails: emailList,
                subject: _subject,
                message: _message
            }
        };
        rp.post(options);
    }
}

module.exports = {
    Notify
};
