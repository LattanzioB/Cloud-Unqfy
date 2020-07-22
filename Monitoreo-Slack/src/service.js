let express = require("express"); // import express
const rp = require('request-promise');
let app = express(); // define our app using express
let router = express.Router();
let bodyParser = require("body-parser");
let {Monitoreo} = require("./monitoreo");
const {
    NotFoundError,
    NotFoundRelatedError,
    AlreadyExistError,
    BadRequestError,
    UnexpectedFailureError,
    InvalidJsonError
  } = require("./APIError");
  const { ErrorHandler } = require("./ErrorHandler");

let port = process.env.PORT || 8083;
app.use(bodyParser.urlencoded({ extended: true }));


try {
    app.use(bodyParser.json());
  } catch (e) {
    console.log(e);
  }

const monitoreo = new Monitoreo()

router.get("/services/", function(req, res) {
    let result = {
        "unqfy" : "Service offline",
        "loggly" : "Service offline",
        "notification" : "Service offline"
    }

    let promise = Promise.all([monitoreo.stateOfUnqfy(),monitoreo.stateOfLoggly() , monitoreo.stateOfNotification()])
    
    promise.then((ress) => {
      result.unqfy = ress[0]
      result.loggly = ress[1]
      result.notification = ress[2]
      res.status(200).json(result)
    })
    
  });


  app.use("/api", router);
  app.use((req, res) => {
    res.status(404);
    res.json({
      status: 404,
      errorCode: "RESOURCE_NOT_FOUND"
    });
  });
  app.use(ErrorHandler);
  console.log(port);
  app.listen(port);
  