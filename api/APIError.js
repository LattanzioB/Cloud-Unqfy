class APIError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
        super(message || name);
        this.name = name;
        this.status = statusCode;
        this.errorCode = errorCode;
    }
}

class NotFoundError extends APIError {
    constructor() {
        super('NotFoundError', 400, 'RELATED_RESOURCE_NOT_FOUND');
    }
}

module.exports = {
    NotFoundError,
};