class Track {
    constructor(name, duration, genres, id) {
        this._id = id;
        this._name = name;
        this._duration = duration;
        this._genres = genres;
        this.lyrics = '';

    }

    get id() { return this._id }
    get name() { return this._name }
    get duration() { return this._duration }
    get genres() { return this._genres }

    toJson() {

        let lyrics = {
            lyrics: this.lyrics
        }

        return artista
    }

    setLyrics(lyrics_) {
        console.log(lyrics_)
        this.lyrics = lyrics_;
    }

    getLyrics() {
        console.log(tema.name);
        //refactor track.getLyrics
        if (!this.lyrics.length) {
            return musicMatchClient
                .searchTrackId(tema.name)
                .then(respuestaID => musicMatchClient.getTrackLyrics(respuestaID))
                .then(respuestaLyrics => tema.setLyrics(respuestaLyrics));
        } else {
            return this.lyrics;
        }
    }


}


module.exports = {
    Track
};