const rp = require('request-promise');

class NotifyClient {
  // eslint-disable-next-line class-methods-use-this
  enviar(listaDeMails, _subject, _message) {
    const options = {
      url: `http://172.20.0.23:8081/api/notify/`,
      qs: {
        mails: listaDeMails,
        subject: _subject,
        message: _message
      }
    };
    rp.post(options);
  }



  notify(_artistId, _subject, _message) {
    console.log("llegue")
    const options = {
      url: `http://172.20.0.23:8081/api/notify/`,
      qs: {
        artistId: _artistId,
        subject: _subject,
        message: _message
      }
    }
    rp.post(options);
  }

  deleteArtist(_artistId) {
    const options = {
      url: `http://172.20.0.23:8081/api/subscriptions/`,
      qs: {
        artistId: _artistId,
      }
    };
    rp.delete(options); 
  }
}


module.exports = {
  NotifyClient
};