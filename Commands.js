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
        const artistId = Number(args[0]);
        const albumData = {
            name: args[1],
            year: Number(args[2]),
        }
        console.log(unqfy.addAlbum(artistId, albumData))
    }
}

class AddTrackCommand {
    invoke(args, unqfy) {
        const albumId = Number(args[0])
        const trackData = {
            name: args[1],
            duration: Number(args[2]),
            genres: args.slice(3, args.length)
        };
        console.log(unqfy.addTrack(albumId, trackData));
        console.log('Se agrego el track de forma correcta.');
    }
}

class CreatePlaylistCommand {
    invoke(args, unqfy) {

        const name = args[0]
        const maxDuration = args[1]
        const genres = args.slice(2, args.length)

        console.log(unqfy.createPlaylist(name, maxDuration, genres));
        console.log('Se creo la playlist de forma correcta.');
    }
}

class PrintArtistsCommand {
    invoke(args, unqfy) {
        console.log(unqfy.artistList);
    }
}

class PrintAlbumsCommand {
    invoke(args, unqfy) {
        console.log(unqfy.findAllAlbums());
    }
}

class PrintTracksCommand {
    invoke(args, unqfy) {
        console.log(unqfy.findAllAlbums().flatMap(album => album.tracks));
    }
}

class PrintPlayListCommand {
    invoke(args, unqfy) {
        console.log(unqfy.playLists);
    }
}

class DeleteTrackCommand {
    invoke(args, unqfy) {
        const idTrack = Number(args[0])
        console.log(unqfy.deleteTrack(idTrack));
    }
}

class DeleteAlbumCommand {
    invoke(args, unqfy) {
        const idAlbum = Number(args[0])
        console.log(unqfy.deleteAlbum(idAlbum));
    }
}

class DeleteArtistCommand {
    invoke(args, unqfy) {
        const idArtist = Number(args[0])
        console.log(unqfy.deleteArtist(idArtist));
    }
}

module.exports = {
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
    DeleteArtistCommand

};