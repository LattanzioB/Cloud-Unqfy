let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const serviceController = require('../controllers/ServiceController');
const {
    NotFoundError,
    NotFoundRelatedError,
    AlreadyExistError,
    BadRequestError,
    UnexpectedFailureError,
    InvalidJsonError,
} = require('./APIError');
const {
    ErrorArtistaRepetido,
    ErrorNoExisteArtist,
    ErrorTrackRepetido,
    ErrorNoExisteAlbum,
    ErrorNoExisteTrack,
    ErrorAlbumRepetido,
    ErrorParametrosInsuficientes,
} = require('../Models/Errors');
const { MusicMatchClient } = require('../Clients/MusicMatch');
let port = process.env.PORT || 8080; // set our port
let service = new serviceController.ServiceController()
let bodyParser = require('body-parser');
const { ErrorHandler } = require('./ErrorHandler');

app.use(bodyParser.urlencoded({ extended: true }));

try {
    app.use(bodyParser.json());
} catch (e) {
    console.log(e);
}

router.get('/', function(req, res) {
    console.log("fnucionando de unqyfy");
    
    res.json({ message: 'funcionando desde unqfy' });
});

router.get('/artists/', function(req, res) {
    try {
        const artists = req.query.name ?
            service.getUNQfy().findAllArtistByName(req.query.name) :
            service.getUNQfy().getAllArtist();

        let artistJson = artists.map(artist => artist.toJson())
        res.status(200).json(artistJson)
    } catch {
        throw new NotFoundError
    }
});

router.get('/artists/:id', function(req, res) {
    try {
        const artist = service.getUNQfy().getArtistById(parseInt(req.params.id))
        let artistJson = artist.toJson()
        res.status(200).json(artistJson)

    } catch {
        throw new NotFoundError
    }

});

router.post('/artists/', function(req, res, next) {
    try {
        const unqfy = service.getUNQfy()
        const artists = unqfy.addArtist(req.body)
        let artistJson = artists.toJson()
        service.saveUNQfy(unqfy)

        res.status(201).json(artistJson)
    } catch (e) {

        if (e instanceof ErrorParametrosInsuficientes) {
            next(new BadRequestError());

        } else {
            next(new AlreadyExistError)
        }

    }
})

router.delete('/artists/:id', function(req, res, next) {
    try {
        const unqfy = service.getUNQfy()
        unqfy.deleteArtist(parseInt(req.params.id));
        service.saveUNQfy(unqfy)
        notify.deleteArtist(parseInt(req.params.id))
        res.status(204).json('OK')
    } catch (e) {
        if (e instanceof ErrorNoExisteArtist) {
            next(new NotFoundError)
        }
    }

})

router.put('/artists/:id', function(req, res) {
    const unqfy = service.getUNQfy()
    const artist = unqfy.updateArtist(parseInt(req.params.id), req.body);
    let artistJson = artist.toJson()
    service.saveUNQfy(unqfy)
    res.status(200).json(artistJson)

})

router.get('/tracks/:id/lyrics/', function(req, res) {
    try {
        const unqfy = service.getUNQfy()
        const lyrics = unqfy.getLyrics(parseInt(req.params.id), MusicMatchClient);
        const trackName = unqfy.getTrackById(parseInt(req.params.id)).name

        let lyric = {
            name: trackName,
            lyric: lyrics,
        }
        res.status(200).json(lyric)
    } catch {
        throw new NotFoundError

    }

});


//********************************************************/

router.get('/albums/', function(req, res) {
    try {

        const albums = req.query.name ?
            service.getUNQfy().findAllAlbumsByName(req.query.name) :
            service.getUNQfy().findAllAlbums();

        let albumJson = albums.map(album => album.toJson())

        res.status(200).json(albumJson)
    } catch {
        next(new NotFoundError());
    }
});




router.get('/albums/:id', function(req, res, next) {
    const albumId = req.params.id
    try {
        const album = service.getUNQfy().getAlbumById(albumId);
        let albumJson = album.toJson();
        res.status(200).json(albumJson)

    } catch (e) {
        next(new NotFoundError());
    }
});

router.post('/albums/', function(req, res, next) {
    try {
        const unqfy = service.getUNQfy()
        const album = unqfy.addAlbum(req.body)
        let albumJson = album.toJson()
        console.log("IMPORTA");

        console.log(albumJson);

        service.saveUNQfy(unqfy)
        notify.notify(req.body.artistId,
            `New Album!`,
            `One of your favorite artist released a new Album called ${req.body.name}, 
            find out who in Unqfy!!`)

        res.status(201).json(albumJson)

    } catch (e) {

        if (e instanceof ErrorParametrosInsuficientes) {
            next(new BadRequestError());
        } else if (e instanceof ErrorAlbumRepetido) {
            next(new AlreadyExistError());
        } else if (e instanceof ErrorNoExisteArtist) {
            next(new NotFoundRelatedError());
        }

    }
})

router.patch('/albums/:id', function(req, res, next) {
    try {
        const albumId = req.params.id;
        const year = req.body.year;
        console.log(albumId, year)
        const unqfy = service.getUNQfy()
        const album = unqfy.changeAlbumYear(Number(albumId), year);
        let albumJson = album.toJson()
        service.saveUNQfy(unqfy)

        res.status(200).json(albumJson)
    } catch {
        next(new NotFoundError());
    }
})


router.delete('/albums/:id', function(req, res, next) {
    try {
        const unqfy = service.getUNQfy()
        unqfy.deleteAlbum(parseInt(req.params.id));
        service.saveUNQfy(unqfy)

        res.status(204).json('OK')
    } catch {
        next(new NotFoundError());
    }
})


// router.post('/playlists/', function(req, res) {
//     const unqfy = service.getUNQfy()
//     const playList = unqfy.createPlaylist(req.body);
//     let playListJson = playList.toJson()
//     service.saveUNQfy(unqfy)

//     res.status(201).json(playListJson)
// })


router.post('/playlists/', function(req, res) {

    if (req.body.name && req.body.tracks) {
        console.log("primer if");

        const unqfy = service.getUNQfy()
        const playList = unqfy.createPlaylistByTracks(req.body);
        let playListJson = playList.toJson()
        let duration = unqfy.trackListDuration(playList.tracks)
        console.log(duration);

        let playlist = {
            id: playList.id,
            name: playList.name,
            duration: duration,
            tracks: playList.tracks
        }

        service.saveUNQfy(unqfy)
        res.status(201).json(playlist)

    } else {
        console.log("else");

        const unqfy = service.getUNQfy()
        const playList = unqfy.createPlaylist(req.body);
        let playListJson = playList.toJson()
        service.saveUNQfy(unqfy)

        res.status(201).json(playListJson)
    }


    // res.json({ status: 201, data: { message: "OK" } });

})

router.get('/playlists/:id', function(req, res) {
    try {
        const unqfy = service.getUNQfy()
        const playList = unqfy.getPlaylistById(parseInt(req.params.id))

        let playListJson = playList.toJson()
        res.status(200).json(playListJson)

    } catch {
        throw new NotFoundError
    }

});

router.get('/playlistsP/', function(req, res) {
    try {
        const unqfy = service.getUNQfy()
        const playList = unqfy.getPlaylistByIdAndParams(req.query.name, req.query.durationLT, req.query.durationGT)

        res.status(200).json(playList)
    } catch {
        throw new NotFoundError
    }

});

router.delete('/playlists/:id', function(req, res) {
    const unqfy = service.getUNQfy()
    const playList = unqfy.deletePlayList(parseInt(req.params.id))
    service.saveUNQfy(unqfy)

    res.status(204).json('OK')
})


app.use('/api', router);
app.use((req, res) => {
    res.status(404);
    res.json({
        status: 404,
        errorCode: 'RESOURCE_NOT_FOUND'
    });
});
console.log(port);

app.use(ErrorHandler);
app.listen(port);