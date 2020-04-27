class Playlist {
    constructor(id, name, genresToInclude, maxDuration) {
        this._id = id;
        this._name = name;
        this._genresToInclude = genresToInclude;
        this._maxDuration = maxDuration;
        this._tracks = [];
    }

    get id() { return this._id }
    get name() { return this._name }
    get genresToInclude() { return this._genresToInclude }
    get maxDuration() { return this._maxDuration }
    get tracks() { return this._tracks }


    addTrack(track) {
        this._tracks.push(track);
    }

}


module.exports = {
    Playlist,
};