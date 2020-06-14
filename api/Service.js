let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const serviceController = require('../controllers/ServiceController');
const { flatMap } = require('lodash');
const {
    NotFoundError,
} = require('./APIError');
const { MusicMatchClient } = require('../Clients/MusicMatch');
let port = process.env.PORT || 8080; // set our port
let service = new serviceController.ServiceController()
let bodyParser = require('body-parser');
const { ErrorHandler } = require('../ErrorHandler');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
    res.json({ message: 'funcionando' });
});

router.get('/artists/', function(req, res) {
    const artists = req.query.name ?
        service.getUNQfy().findAllArtistByName(req.query.name) :
        service.getUNQfy().getAllArtist();

    let artistJson = artists.map(artist => artist.toJson())

    res.json({ status: 200, data: artistJson });
});

router.get('/artists/:id', function(req, res) {
    try {
        const artist = service.getUNQfy().getArtistById(parseInt(req.params.id))
        let artistJson = artist.toJson()
        res.json({ status: 200, data: artistJson });
    } catch(e) {
        throw new NotFoundError
    }

});

router.post('/artists/', function(req, res) {
    const unqfy = service.getUNQfy()
    const artists = unqfy.addArtist(req.body)
    let artistJson = artists.toJson()
    service.saveUNQfy(unqfy)

    res.json({ status: 201, data: artistJson });
})

router.delete('/artists/:id', function(req, res) {
    const unqfy = service.getUNQfy()
    unqfy.deleteArtist(parseInt(req.params.id));
    service.saveUNQfy(unqfy)

    res.json({ status: 204, data: 'OK' });
})

router.put('/artists/:id', function(req, res) {
    const unqfy = service.getUNQfy()
    const artist = unqfy.updateArtist(parseInt(req.params.id), req.body);
    let artistJson = artist.toJson()
    service.saveUNQfy(unqfy)

    res.json({ status: 200, data: artistJson });
})

router.get('/tracks/:id/lyrics', function(req, res) {
    const unqfy = service.getUNQfy()
    const lyrics = unqfy.getLyrics(parseInt(req.params.id), MusicMatchClient);

    res.json({ status: 200, data: { lyric: lyrics } });
});


//********************************************************/

router.get('/albums/', function(req, res) {
    const albums = req.query.name ?
    service.getUNQfy().findAllAlbumsByName(req.query.name) :
        service.getUNQfy().findAllAlbums();

    let albumJson = albums.map(album => album.toJson())

    res.json({ status: 200, data: albumJson });
});




router.get('/albums/:id', function(req, res, next) {
    const albumId = req.params.id
    

    try{
        const album = service.getUNQfy().getAlbumById(albumId);
        let albumJson =  album.toJson();
        res.json({ status: 200, data: albumJson });
    }catch(e){
        next(new NotFoundError());
    }
});

router.post('/albums/', function(req, res) {
    const unqfy = service.getUNQfy()
    const album = unqfy.addAlbum(req.body)
    let albumJson = album.toJson()
    service.saveUNQfy(unqfy)

    res.json({ status: 201, data: albumJson });
})

router.patch('/albums/year/:id', function(req, res) {
    const albumId = req.params.id; 
    const year = req.body.year;
    console.log(albumId, year)
    const unqfy = service.getUNQfy()
    const album = unqfy.changeAlbumYear(Number(albumId), year);
    let albumJson = album.toJson()
    service.saveUNQfy(unqfy)

    res.json({ status: 200, data: albumJson });
})


router.delete('/albums/:id', function(req, res) {
    const unqfy = service.getUNQfy()
    unqfy.deleteAlbum(parseInt(req.params.id));
    service.saveUNQfy(unqfy)

    res.json({ status: 204, data: 'OK' });
})


router.post('/playlists/', function(req, res) {
    const unqfy = service.getUNQfy()
    const playList = unqfy.createPlaylist(req.body);
    let playListJson = playList.toJson()

    service.saveUNQfy(unqfy)

    res.json({ status: 201, data: playListJson });

})


router.post('/playlistsT/', function(req, res) {
    const unqfy = service.getUNQfy()
    const playList = unqfy.createPlaylistByTracks(req.body);
    // let playListJson = playList.toJson()

    service.saveUNQfy(unqfy)

    res.json({ status: 201, data: { message: "OK" } });

})



app.use('/api', router);
app.use((req, res) => {
    res.status(404);
    res.json({
        status: 404,
        errorCode: 'RESOURCE_NOT_FOUND'
    });
});
app.use(ErrorHandler);
app.listen(port);