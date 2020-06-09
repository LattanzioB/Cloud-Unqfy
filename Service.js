let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const serviceController = require('./controllers/ServiceController');

let port = process.env.PORT || 8080; // set our port
let service = new serviceController.ServiceController()
let bodyParser = require('body-parser');

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
    const artist = service.getUNQfy().getArtistById(parseInt(req.params.id))
    let artistJson = artist.toJson()

    // service.saveUNQfy(getUNQfy())

    res.json({ status: 200, data: artistJson });
});

router.post('/artists/', function(req, res) {
    const artists = service.getUNQfy().addArtist(req.body)
    let artistJson = artists.toJson()
        //COMO GUARDAR UNQFY
    res.json({ status: 201, data: artistJson });
})

app.use('/api', router);
app.listen(port);