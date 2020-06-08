let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const artists = require('./controllers/artistaController');
const { getUnqfy } = require('./config/unqfy');


let port = process.env.PORT || 8080; // set our port
let artistController = new artists.ArtistaController()

router.get('/', function(req, res) {
    res.json({ message: 'funcionando' });
});

router.get('/artists/', function(req, res) {
    const artists = req.params.name ?
        artistController.getUNQfy().findAllArtistByName(req.params.name) : artistController.getUNQfy().getAllArtist()

    console.log(artistController.getUNQfy());

    let artistJson = artists.map(artist => artist.toJson())

    res.json({ status: 200, data: artistJson });

});


// router.get('/artists', getUnqfy, artists.all);


app.use('/api', router);
app.listen(port);