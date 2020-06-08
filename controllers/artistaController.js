exports.all = (req, res, next) => {
    const artists = req.query.name ?
        res.locals.unqfy.findAllArtistByName(req.query.name) :
        res.locals.unqfy.getAllArtist();
    return next({ status: 200, data: artists });
};