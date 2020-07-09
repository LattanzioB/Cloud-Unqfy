let express = require('express'); // import express
let app = express(); // define our app using express
let router = express.Router();
const {
    NotFoundError,
    NotFoundRelatedError,
    AlreadyExistError,
    BadRequestError,
    UnexpectedFailureError,
    InvalidJsonError,
} = require('./APIError');
const { ErrorHandler } = require('./ErrorHandler');
let port = process.env.PORT || 8081; // set our port
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

try {
    app.use(bodyParser.json());
} catch (e) {
    console.log(e);
}


router.get('/', function(req, res) {
    res.json({ message: 'funcionando' });
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
console.log("Api On");
app.listen(port);