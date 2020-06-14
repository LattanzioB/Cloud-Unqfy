const {
    NotFoundError,
    NotFoundRelatedError,
    AlreadyExistError,
    BadRequestError,
    UnexpectedFailureError

} = require('./APIError');

function ErrorHandler(err, req, res, next) {
    console.error(err); // imprimimos el error en consola
    // Chequeamos que tipo de error es y actuamos en consecuencia

    switch (true) {
        case err instanceof NotFoundError:
            res.status(err.status);
            res.json({ status: err.status, errorCode: err.errorCode });
            break;
        case err instanceof NotFoundRelatedError:
            res.status(err.status);
            res.json({ status: err.status, errorCode: err.errorCode });
            break;
        case err instanceof AlreadyExistError:
            res.status(err.status);
            res.json({ status: err.status, errorCode: err.errorCode });
            break;
        case err instanceof BadRequestError:
            res.status(err.status);
            res.json({ status: err.status, errorCode: err.errorCode });
            break;
        case err instanceof UnexpectedFailureError:
            res.status(err.status);
            res.json({ status: err.status, errorCode: err.errorCode });
            break;
        case err.type === 'entity.parse.failed':
            res.status(err.status);
            res.json({ status: err.status, errorCode: 'INVALID_JSON' });
            break;
        default:
            // code block
            next(err);

    }

}

module.exports = {
    ErrorHandler,
    NotFoundError,
    NotFoundRelatedError,
    AlreadyExistError,
    BadRequestError,
    UnexpectedFailureError,
};