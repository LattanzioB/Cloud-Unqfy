class Playlist {
    constructor(id, name, genresToInclude, maxDuration, tracks) {
        this._id = id;
        this._name = name;
        this._genresToInclude = genresToInclude;
        this._duration = maxDuration;
        this._tracks = tracks;
    }

    get id() { return this._id }
    get name() { return this._name }
    get genresToInclude() { return this._genresToInclude }
    get duration() { return this._duration }
    get tracks() { return this._tracks }


    addTrack(track) {
        this._tracks.push(track);
    }



    hasTrack(track) {
        return this._tracks.includes(track)
    }

}


module.exports = {
    Playlist,
};