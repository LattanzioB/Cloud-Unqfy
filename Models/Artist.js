class Artist {

    constructor(name, country, id) {
        this._id = id;
        this._name = name;
        this._country = country;
        this._albums = [];
    }

    get name() { return this._name }
    get country() { return this._country }
    get id() { return this._id }
    get albums() { return this._albums }
    set albums(albums) { return this._albums = albums }

    toJson() {

        let artista = {
            id: this._id,
            name: this.name,
            country: this.country
        }

        return artista
    }

    addAlbum(album) {
        this._albums.push(album)
    }

    searchAlbum(id) {
        return this._albums.find(album => album._id == id)
    }

    deleteAlbum(id) {
        this.albums = this.albums.filter(album => album.id != id);
    }

    searchTrack(id) {
        return this.albums.find(albums => albums.searchTrack(id));
    }

    searchAndDeleteTracks(id) {
        this.albums.forEach(albums => albums.deleteTrack(id));
    }

    deleteAllAlbums() {
        this.albums = []
    }

    getAllTracksIds() {
        return this.albums.flatMap(album => album.getAllTracksIds())
    }
}


module.exports = {
    Artist,
};