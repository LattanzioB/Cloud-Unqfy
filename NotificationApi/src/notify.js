const {
  sendMail
} = require("./recursos_para_gmail_api/send-mail-example/sendMail");

const { UnqfyClient } = require("./clients/UnqfyClient");
const rp = require("request-promise");
const {
  NotFoundError,
  NotFoundRelatedError,
  AlreadyExistError,
  BadRequestError,
  UnexpectedFailureError,
  InvalidJsonError
} = require("./APIError");

const {
  ErrorArtistaRepetido,
  ErrorNoExisteArtist,
  ErrorTrackRepetido,
  ErrorNoExisteAlbum,
  ErrorNoExisteTrack,
  ErrorAlbumRepetido,
  ErrorParametrosInsuficientes,
  ErrorNoExisteEmail
} = require("./Error");

class Notification {
  constructor() {
    this._suscriptors = [];
    this._unqfyClient = new UnqfyClient();
  }

  get suscriptors() {
    return this._suscriptors;
  }

  getSuscriptorsByArtistId(artistId) {
    let suscriptorsG = this.suscriptors.filter(sus => sus.artistId == artistId);

    return suscriptorsG.map(sus => sus.email);
  }

  getSuscriptorsEmail(email) {
    let suscriptorsG = this.suscriptors.filter(sus => sus.email == email);
    return suscriptorsG;
  }

  addSuscriptor(artistIDToSuscribe, emailToSuscribe) {
    return this._unqfyClient
      .searchArtistIdL(artistIDToSuscribe)
      .then(() => {
        this._suscriptors.push({
          artistId: artistIDToSuscribe,
          email: emailToSuscribe
        });
      })
      .catch(e => {
        if (!artistIDToSuscribe || !emailToSuscribe) {
          throw new BadRequestError();
        } else {
          throw new NotFoundError();
        }
      });
  }

  removeSuscriptor(artistIDToDesuscribe, emailToDesuscribe) {
    if (
      this.getSuscriptorsByArtistId(artistIDToDesuscribe).length > 0 &&
      this.getSuscriptorsEmail(emailToDesuscribe).length > 0
    ) {
      this._suscriptors = this._suscriptors.filter(
        item =>
          item.email !== emailToDesuscribe ||
          item.artistId !== artistIDToDesuscribe
      );
    } else if (this.getSuscriptorsByArtistId(artistIDToDesuscribe).length == 0 ) {
      throw new ErrorNoExisteArtist();
    } else if (this.getSuscriptorsEmail(emailToDesuscribe).length == 0 ) {
      throw new ErrorNoExisteEmail();
    }
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
