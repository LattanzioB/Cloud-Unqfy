class ErrorNoExisteAlbum extends Error {
    handle(x) {
        x.handleAlbumError()
    }
}

class ErrorNoExisteArtist extends Error {
    handle(x) {
        x.handleAristError()
    }
}

module.exports = {
    ErrorNoExisteAlbum,
    ErrorNoExisteArtist
};