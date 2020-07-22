let express = require("express"); // import express
let app = express(); // define our app using express
let router = express.Router();
const {
  NotFoundError,
  NotFoundRelatedError,
  AlreadyExistError,
  BadRequestError,
  UnexpectedFailureError,
  InvalidJsonError
} = require("./APIError");
const { ErrorHandler } = require("./ErrorHandler");
let { LogglyModel } = require("./model"); 
let port = process.env.PORT || 8082; // set our port
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

try {
    app.use(bodyParser.json());
  } catch (e) {
    console.log(e);
  }



let logglyModel = new LogglyModel()
  
router.get("/statusCheck/", function(req, res) {
  res.json({ message: "funcionando" });
});


router.post("/newLog/", function(req, res) {
    console.log("llegue newLog")
    logglyModel.log(req.query.status, req.query.message);
    
  
    res.status(200).json("OK");
  });


  router.post("/newApiLog/", function(req, res) {
    console.log("llegue post newApiLog")
    logglyModel.log(req.body.status, req.body.message);
    res.status(200).json("OK");
  });


router.post("/activate", function(req, res) {

  logglyModel.activate();

  res.status(204).json("OK");
});

router.post("/deactivate", function(req, res) {

  logglyModel.deactivate();

  res.status(204).json("OK");
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
