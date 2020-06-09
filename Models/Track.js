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

    setLyrics(lyrics_) {
        console.log(lyrics_)
        this.lyrics = lyrics_;
    }

    getLyrics() {
        return this.lyrics;
    }
}


module.exports = {
    Track
};