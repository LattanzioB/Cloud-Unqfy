let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const serviceController = require('./controllers/ServiceController');
const { flatMap } = require('lodash');
const {
    ArtistInexistenteError,
} = require('./Models/APIError');
const { MusicMatchClient } = require('./Clients/MusicMatch');
let port = process.env.PORT || 8080; // set our port
let service = new serviceController.ServiceController()
let bodyParser = require('body-parser');
const { ErrorHandler } = require('./ErrorHandler');

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
    } catch {
        throw new ArtistInexistenteError
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