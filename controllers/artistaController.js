const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../unqfy'); // importamos el modulo unqfy

class ArtistaController {
    getUNQfy(filename = 'data.json') {
        let unqfy = new unqmod.UNQfy();
        if (fs.existsSync(filename)) {
            unqfy = unqmod.UNQfy.load(filename);
        }
        return unqfy;
    }

    saveUNQfy(unqfy, filename = 'data.json') {
        unqfy.save(filename);
    }
}

// exports.all = (req, res, next) => {
//     const artists = req.query.name ?
//         res.locals.unqfy.findAllArtistByName(req.query.name) :
//         res.locals.unqfy.getAllArtist();
//     return next({ status: 200, data: artists });
// };

module.exports = {
    ArtistaController,
};