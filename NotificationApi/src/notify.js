const {
  sendMail
} = require("./recursos_para_gmail_api/send-mail-example/sendMail");

class Notification {
  constructor() {
    this._suscriptors = [];
  }

  get suscriptors() {
    return this._suscriptors;
  }

  getSuscriptorsByArtistId(artistId) {
    let suscriptorsG = this.suscriptors.filter(sus => sus.artistId == artistId);

    return suscriptorsG.map(sus => sus.email)
  }

  addSuscriptor(artistIDToSuscribe, emailToSuscribe) {
    this._suscriptors.push({
      artistId: artistIDToSuscribe,
      email: emailToSuscribe
    });
  }

  removeSuscriptor(artistIDToDesuscribe, emailToDesuscribe) {
    this._suscriptors = this._suscriptors.filter(
      item =>
        item.email !== emailToDesuscribe ||
        item.artistId !== artistIDToDesuscribe
    );
  }

  deleteEmailsFromArtist(artistIDToDesuscribe) {
    // no quedaria ningun artist id, ya que no quedarian suscriptores para el artista
    this._suscriptors = this._suscriptors.filter(
      item => item.artistId !== artistIDToDesuscribe
    );
  }

  sendMail(artistId, subject, message) {
    let listaEmails = this.getSuscriptorsByArtistId(artistId);
    listaEmails.forEach(email => {
      sendMail(email, subject, message);
    });
  }
}

module.exports = {
  Notification
};
