const rp = require('request-promise');

class NotifyClient {
  // eslint-disable-next-line class-methods-use-this
  enviar(listaDeMails, _subject, _message) {
    const url = 'http://172.20.0.2/';
    const port = '8001';
    const options = {
      url: `${url}:${port}/api/notify`,
      qs: {
        mails: listaDeMails,
        subject: _subject,
        message: _message
      }
    };
    rp.post(options);
  }



  notify(_artistId, _subject, _message) {
    const url = 'http://172.20.0.2/';
    const port = '8001';
    const options = {
      url: `${url}:${port}/api/notify`,
      qs: {
        artistId: _artistId,
        subject: _subject,
        message: _message
      }
    };
    rp.post(options);
  }

  deleteArtist(_artistId) {
    const url = 'http://172.20.0.2/';
    const port = '8001';
    const options = {
      url: `${url}:${port}/api/subscriptions/`,
      qs: {
        artistId: _artistId,
      }
    };
    rp.post(options); 
  }
}


module.exports = {
  NotifyClient
};