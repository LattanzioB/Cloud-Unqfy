class Album {
    constructor(id, name, year) {
        this._id = id;
        this._name = name;
        this._year = year;
        this._tracks = [];
    }

    get id() { return this._id }
    get name() { return this._name }
    get year() { return this._year }
    get tracks() { return this._tracks }
    set tracks(tracks) { return this._tracks = tracks }

    addTrack(track) {
        this._tracks.push(track);
    }

    searchTrack(id) {
        return this.tracks.find(track => track.id === id);
    }


    deleteTrack(id) {
        this.tracks = this.tracks.filter(track => track.id !== id);
    }

    deleteAllTracks() {
        this.tracks = []
    }

    getAllTracksIds() {
        return this.tracks.map(track => track.id)
    }

    toJson() {

        let album = {
            id: this._id,
            name: this._name,
            year: this._year,
            tracks: this._tracks,
        }
        return album

    }

}
module.exports = { Album }