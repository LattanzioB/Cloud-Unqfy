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