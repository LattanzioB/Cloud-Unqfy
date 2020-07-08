class User {
    constructor(id, email) {
        this._id = id;
        this._email = email;
    }

    get id() { return this._id }
    get email() { return this._email }

}

module.exports = {
    User
};
