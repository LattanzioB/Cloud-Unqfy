class AddArtistCommand {
    invoke(args, unqfy) {
        const artistData = {
            name: args[0],
            country: args[1],
        };
        console.log(unqfy.addArtist(artistData));
        console.log('Se agrego el artista de forma correcta.');
    }
}

class AddAlbumCommand {
    invoke(args, unqfy) {
        const trackData = {
            artistId: args[0],
            name: args[1],
            year: args[2]
        };
        console.log(unqfy.addAlbum(trackData));
        console.log('Se agrego el album de forma correcta.');
    }
}

class AddTrackCommand {
    invoke(args, unqfy) {
        const trackData = {
            albumName: args[0],
            name: args[1],
            duration: args[2],
            genres: args[3],
        };
        console.log(unqfy.addTrack(trackData));
        console.log('Se agrego el track de forma correcta.');
    }
}

class CreatePlaylistCommand {
    invoke(args, unqfy) {
        const playlistData = {
            name: args[0],
            genres: args[1],
            maxDuration: args[2],
        };
        console.log(unqfy.createPlaylist(playlistData));
        console.log('Se creo la playlist de forma correcta.');
    }
}

class PrintArtistsCommand {
    invoke(args, unqfy) {
        console.log(unqfy.artistList);
    }
}

module.exports = {
    AddArtistCommand,
    PrintArtistsCommand,
    AddAlbumCommand,
    AddTrackCommand,
    CreatePlaylistCommand
};