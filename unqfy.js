const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const { Artist } = require('./Models/Artist');
const { Album } = require('./Models/Album');
const { Track } = require('./Models/Track');
const { Playlist } = require('./Models/Playlist');
const { flatMap } = require('lodash');
const {
    ErrorArtistaRepetido,
    ErrorNoExisteArtist,
    ErrorTrackRepetido,
    ErrorNoExisteAlbum,
    ErrorNoExisteTrack,
    ErrorAlbumRepetido,
} = require('./Models/Errors');

class UNQfy {

    constructor() {
        this.artistList = [];
        this.playLists = [];
        this.nextIdArtist = 0;
        this.nextIdPlayList = 0;
        this.nextIdTrack = 0;
        this.nextIdAlbum = 0;
    }

    populateAlbumsForArtist(artistId, spotifyClient) {
        const artistName = this.getArtistById(artistId).name;

        return spotifyClient.getArtistByName(artistName)
            .then(idArtistSpotify => spotifyClient.populateAlbumsForArtist(idArtistSpotify))
            .then(albums => {
                albums.forEach(element => {
                    this.addAlbumNoObject(artistId, element.name, element.release_date);

                });
                // console.log(albums);

            })
            .catch(error => console.log(error));
    }

    addAlbumNoObject(artistId, name, year) {
        const artist = this.getArtistById(artistId);
        const album = new Album(this.nextIdAlbum, name, year);
        artist.addAlbum(album);
        this.nextIdAlbum++;
        return album;
    }

    getAllArtist() {
        return this.listaDeArtistas;
    }

    // artistData: objeto JS con los datos necesarios para crear un artista
    //   artistData.name (string)
    //   artistData.country (string)
    // retorna: el nuevo artista creado
    addArtist(artistData) {
        const checkArtist = this.artistList.find(artist => artist.name === artistData.name)

        if (checkArtist) {
            throw new ErrorArtistaRepetido()
        }
        let newArtist = new Artist(artistData.name, artistData.country, this.nextIdArtist);
        this.artistList.push(newArtist)
        this.nextIdArtist++;

        return newArtist;

        /* Crea un artista y lo agrega a unqfy.
          El objeto artista creado debe soportar (al menos):
            - una propiedad name (string)
            - una propiedad country (string)
          */
    }


    // albumData: objeto JS con los datos necesarios para crear un album
    //   albumData.name (string)
    //   albumData.year (number)
    // retorna: el nuevo album creado
    addAlbum(artistId, { name, year }) {
        const checkAlbum = this.findAllAlbums().find(album => album.name == name);

        if (checkAlbum) {
            throw new ErrorAlbumRepetido()
        }

        const artist = this.getArtistById(artistId);
        const newAlbum = new Album(this.nextIdAlbum, name, year);
        this.nextIdAlbum++;
        artist.addAlbum(newAlbum);
        return newAlbum;
        /* Crea un album y lo agrega al artista con id artistId.
          El objeto album creado debe tener (al menos):
           - una propiedad name (string)
           - una propiedad year (number)
        */
    }



    // trackData: objeto JS con los datos necesarios para crear un track
    //   trackData.name (string)
    //   trackData.duration (number)
    //   trackData.genres (lista de strings)
    // retorna: el nuevo track creado
    addTrack(albumId, { name, duration, genres }) {
        const checkTrack = flatMap(this.findAllAlbums(), album => album.tracks).find(
            track => track.name === name
        );
        if (checkTrack) {
            throw new ErrorTrackRepetido()
        }

        const album = this.getAlbumById(albumId);
        const track = new Track(name, duration, genres, this.nextIdTrack);
        this.nextIdTrack++;
        album.addTrack(track);
        return track;
        /* Crea un track y lo agrega al album con id albumId.
        El objeto track creado debe tener (al menos):
            - una propiedad name (string),
            - una propiedad duration (number),
            - una propiedad genres (lista de strings)
        */
    }

    getArtistById(id) {
        const artist = this.artistList.find(artist => artist.id === id)
        if (!artist) {
            throw new ErrorNoExisteArtist;
        }
        return artist
    }

    getAlbumById(id) {
        // console.log(this.artistList[0]);
        const artistAlbum = this.artistList.find(artist => artist.searchAlbum(id));


        const album = artistAlbum.searchAlbum(id);
        if (!album) {
            throw new ErrorNoExisteAlbum;
        } //console.log(artistAlbum.searchAlbum(id));

        return (album);
    }

    deleteArtist(id) {
        const artistToDelete = this.getArtistById(id);
        const artistTracksIds = artistToDelete.getAllTracksIds()
            //const tracksArtist = this.getArtistById(id).albums.flatMap(albums => albums.tracks)
        const albums = artistToDelete.albums
        albums.map(album => album.deleteAllTracks())
        artistToDelete.deleteAllAlbums()

        this.artistList = this.artistList.filter(artist => artist.id !== artistToDelete.id)
        artistTracksIds.map(id => this.deleteTrackInPlayslistByID(id))
    }

    deleteAlbum(id) {
        //this.artistList.forEach(artist => artist.deleteAlbum(id));
        const artistAlbum = this.artistList.find(artist => artist.searchAlbum(id));
        const album = this.getAlbumById(id)
        const tracksIds = album.tracks.map(track => track.id)

        album.deleteAllTracks()

        tracksIds.map(id => this.deleteTrackInPlayslistByID(id))
        artistAlbum.deleteAlbum(id)
    }

    deleteTrack(id) {
        this.artistList.forEach(artist => artist.searchAndDeleteTracks(id));
        this.deleteTrackInPlayslistByID(id)
    }

    deleteTrackInPlayslistByID(id) {
        this.playLists.map(playlist => playlist.deleteTrackPlaylist(id))
    }

    getTrackById(id) {
        const artist = this.artistList.find(artist => artist.searchTrack(id));
        //agregar error artist
        const album = artist.searchTrack(id);
        //agregar error album
        const track = album.searchTrack(id);
        if (!track) {
            throw new ErrorNoExisteTrack;
        }
        return track;
    }

    getPlaylistById(id) {
        return this.listPlayList.find(playlist => playlist.id === id);
    }

    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    getTracksMatchingGenres(genress) {
        const tracks = flatMap(this.findAllAlbums(), album => album.tracks);
        //refactor
        const tracksFilteredByGenres = tracks.filter(track => track.genres.some(genre => genress.includes(genre)));
        //console.log(tracksFilteredByGenres);
        return tracksFilteredByGenres;

    }


    // artistName: nombre de artista(string)
    // retorna: los tracks interpredatos por el artista con nombre artistName
    getArtistByName(artistName) {
        const artist = this.artistList.find(artist => artist.name == artistName);
        if (artist == undefined) {
            throw new ErrorNoExisteArtist;
        }
        return artist;
    }


    getTracksMatchingArtist(artistName) {
        const artist = this.getArtistByName(artistName);
        const albums = artist.albums;
        const artistracks = flatMap(albums, album => album.tracks);
        return artistracks;
    }


    // name: nombre de la playlist
    // genresToInclude: array de generos
    // maxDuration: duración en segundos
    // retorna: la nueva playlist creada
    createPlaylist(name, maxDuration, genresToInclude) {
        /*** Crea una playlist y la agrega a unqfy. ***
          El objeto playlist creado debe soportar (al menos):
            * una propiedad name (string)
            * un metodo duration() que retorne la duración de la playlist.
            * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
        */
        const trakcsWithGenre = this.getTracksMatchingGenres(genresToInclude);
        const trackListWithLimitTime = this.limitTracklistTime(trakcsWithGenre, 1400);

        const playlist = new Playlist(this.nextIdPlayList, name, genresToInclude, maxDuration, trackListWithLimitTime);
        this.nextIdPlayList++;
        this.playLists.push(playlist);
        return playlist;
    }

    //refactor
    limitTracklistTime(trackList, time) {
        let res = trackList;
        let trackFinal = [];

        while (res.length != 0) {
            if (this.trackListDuration(trackFinal) + res[res.length - 1].duration <= time) {
                trackFinal.push(res.pop())
            } else {
                res.pop()
            }
        }
        //console.log(trackFinal);
        return trackFinal;
    }

    trackListDuration(trackList) {
        let res = 0;
        trackList.forEach(track => {
            res += track.duration;
        });
        return res;
    }

    findAllArtistByName(name) {
        return this.artistList.filter(artist => artist.name.includes(name));
    }

    findAllAlbums() {
        return flatMap(this.artistList, artist => artist.albums);
    }

    findAllAlbumsByName(name) {
        return this.findAllAlbums().filter(album => album.name.includes(name));
    }

    findAllTracksByName(name) {
        return flatMap(this.findAllAlbums(), album => album.tracks).filter(track => track.name.includes(name))
    }

    findAllPlaylistsByName(name) {
        return this.playLists.filter(playlist => playlist.name.includes(name));
    }

    searchByName(name) {
        return {
            artists: this.findAllArtistByName(name),
            albums: this.findAllAlbumsByName(name),
            tracks: this.findAllTracksByName(name),
            playlists: this.findAllPlaylistsByName(name),
        }

    }

    save(filename) {
        const listenersBkp = this.listeners;
        this.listeners = [];

        const serializedData = picklify.picklify(this);

        this.listeners = listenersBkp;
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }

    static load(filename) {
        const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
        const classes = [UNQfy, Artist, Album, Track, Playlist];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
    UNQfy,
};