class AddArtistCommand {
    invoke(args, unqfy) {
        const artistData = {
            name: args[0],
            country: args[1],
        }
        console.log(unqfy.addArtist(artistData))
        console.log('Se agrego el artista de forma correcta.')
    }
}

class PrintArtistsCommand {
    invoke(args, unqfy) {
        console.log(unqfy.artistList)
    }
}

module.exports = {
    AddArtistCommand,
    PrintArtistsCommand,
}