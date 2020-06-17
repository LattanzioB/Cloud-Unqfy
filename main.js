const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
let express = require('express'); // import express

const {
    AddArtistCommand,
    AddAlbumCommand,
    AddTrackCommand,
    CreatePlaylistCommand,
    PrintArtistsCommand,
    PrintAlbumsCommand,
    PrintTracksCommand,
    PrintPlayListCommand,
    DeleteTrackCommand,
    DeleteAlbumCommand,
    DeleteArtistCommand,
    GetArtistByIdCommand,
    GetTracksMatchingArtistCommand,
    GetAlbumByIdCommand,
    GetTrackByIdCommand,
    GetPlaylistByIdCommand,
    FindArtistByNameCommand,
    FindAlbumsByNameCommand,
    FindPlaylistsByNameCommand,
    FindTracksByNameCommand,
    PopulateAlbumsForArtist,
    GetLyricsCommand,
} = require('./Commands');

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
    unqfy.save(filename);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

class Command {
    constructor() {
        this.commands = {
            addArtist: new AddArtistCommand(),
            addAlbum: new AddAlbumCommand(),
            addTrack: new AddTrackCommand(),
            createPlaylist: new CreatePlaylistCommand(),
            printAllArtistList: new PrintArtistsCommand(),
            printAllAlbumsList: new PrintAlbumsCommand,
            printAllTracks: new PrintTracksCommand(),
            printAllPlaylists: new PrintPlayListCommand(),
            deleteTrack: new DeleteTrackCommand(),
            deleteAlbum: new DeleteAlbumCommand(),
            deleteArtist: new DeleteArtistCommand(),
            getArtistById: new GetArtistByIdCommand(),
            getTracksMatchingArtist: new GetTracksMatchingArtistCommand(),
            getTrackById: new GetTrackByIdCommand(),
            getAlbumtById: new GetAlbumByIdCommand(),
            getPlaylistById: new GetPlaylistByIdCommand(),
            findArtistByName: new FindArtistByNameCommand(),
            findAlbumsByName: new FindAlbumsByNameCommand(),
            findPlaylistsByName: new FindPlaylistsByNameCommand(),
            FindTracksByName: new FindTracksByNameCommand(),
            populateAlbumsForArtist: new PopulateAlbumsForArtist(),
            getLyrics: new GetLyricsCommand(),
        };
    }

    get(key) {
        return this.commands[key];
    }

}

function main() {

    const unqFy = getUNQfy();

    const nameFunction = process.argv[2];
    const args = process.argv.splice(3);
    const operation = new Command();
    try {
        const command = operation.get(nameFunction);
        console.log(command);
        command.invoke(args, unqFy)
        console.log(nameFunction);

        if (nameFunction != "getLyrics" && nameFunction != "populateAlbumsForArtist") {
            console.log(nameFunction);
            saveUNQfy(unqFy);
        }

    } catch (error) {
        console.log(error);
        //error.handle(handler); 
    }
}

main();