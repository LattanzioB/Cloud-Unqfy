class Track {
    constructor({name, duration, genres }, id) {
        this._id = id;
        this._name = name;
        this._duration = duration;
        this._genres = genres;
    }

    get id() { return this._id }
    get name() { return this._name }
    get duration() { return this._duration }
    get genres() { return this._genres }
}

module.exports = {
    Track
};