let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const serviceController = require('./controllers/ServiceController');

let port = process.env.PORT || 8080; // set our port
let service = new serviceController.ServiceController()

router.get('/', function(req, res) {
    res.json({ message: 'funcionando' });
});

router.get('/all-artists/', function(req, res) {
    const artists = service.getUNQfy().getAllArtist()
    let artistJson = artists.map(artist => artist.toJson())

    res.json({ status: 200, data: artistJson });

});

app.use('/api', router);
app.listen(port);