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


    addAlbum(album) {
        this._albums.push(album)
    }

    searchAlbum(id) {
        return this._albums.find(album => album._id === id)
    }
}


module.exports = {
    Artist,
};