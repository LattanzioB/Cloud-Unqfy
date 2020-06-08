let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const artists = require('./controllers/artistaController');
const { getUnqfy } = require('./config/unqfy');


let port = process.env.PORT || 8080; // set our port

router.get('/', function(req, res) {
    res.json({ message: 'funcionando' });
});

// router.get('/artists', function(req, res) {
//     const artists = req.query.name ?
//         getUnqfy.locals.unqfy.findAllArtistByName(req.query.name) : getUnqfy.locals.unqfy.getAllArtist()
//     res.json({ status: 200, data: artists });

// });


router.get('/artists', getUnqfy, artists.all);


app.use('/api', router);
app.listen(port);