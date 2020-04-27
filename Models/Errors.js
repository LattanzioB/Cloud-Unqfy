class ErrorNoExistentArtist extends Error {
    handle(x) {
        x.handleAlbumError()
    }
}

module.exports = {
    ErrorNoExistentArtist
};