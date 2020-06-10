class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
        super(message || name);
        this.name = name;
        this.status = statusCode;
        this.errorCode = errorCode;
    }
}

class ArtistInexistenteError extends APIError {
    constructor() {
        super('ArtistInexistenteError', 400, 'RELATED_RESOURCE_NOT_FOUND');
    }
}