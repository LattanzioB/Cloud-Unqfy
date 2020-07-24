class ErrorArtistaRepetido extends Error {
  constructor() {
    super("Error artista repetido");
    this.name = "ErrorArtistaRepetido";
  }
}

class ErrorParametrosInsuficientes extends Error {
  constructor() {
    super("Error parametros insuficientes");
    this.name = "ErrorParametrosInsuficientes";
  }
}

class ErrorNoExisteArtist extends Error {
  constructor() {
    super("Error artista inexistente");
    this.name = "ErrorNoExisteArtist";
  }
}

class ErrorTrackRepetido extends Error {
  constructor() {
    super("Error track repetido");
    this.name = "ErrorTrackRepetido";
  }
}

class ErrorAlbumRepetido extends Error {
  constructor() {
    super("Error album repetido");
    this.name = "ErrorAlbumRepetido";
  }
}

class ErrorNoExisteAlbum extends Error {
  constructor() {
    super("Error album inexistente");
    this.name = "ErrorNoExisteAlbum";
  }
}

class ErrorNoExisteTrack extends Error {
  constructor() {
    super("Error track inexistente");
    this.name = "ErrorNoExisteTrack";
  }
}

class ErrorNoExisteEmail extends Error {
  constructor() {
    super("Error email inexistente");
    this.name = "ErrorNoExisteEmail";
  }
}

module.exports = {
  ErrorArtistaRepetido,
  ErrorNoExisteArtist,
  ErrorTrackRepetido,
  ErrorNoExisteAlbum,
  ErrorNoExisteTrack,
  ErrorAlbumRepetido,
  ErrorParametrosInsuficientes,
  ErrorNoExisteEmail
};
