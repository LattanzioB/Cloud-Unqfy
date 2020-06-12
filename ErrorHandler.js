const {
    ArtistInexistenteError,
} = require('./Models/APIError');

function ErrorHandler(err, req, res, next) {
    console.error(err); // imprimimos el error en consola
    // Chequeamos que tipo de error es y actuamos en consecuencia
    if (err instanceof ArtistInexistenteError) {
        res.status(err.status);
        res.json({ status: err.status, errorCode: err.errorCode });
    } else if (err.type === 'entity.parse.failed') {
        // body-parser error para JSON invalido
        res.status(err.status);
        res.json({ status: err.status, errorCode: 'INVALID_JSON' });
    } else {
        // continua con el manejador de errores por defecto
        next(err);
    }
}

module.exports = {
    ErrorHandler,
};