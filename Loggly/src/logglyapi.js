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
let { LogglyModel } = requiere("./models"); 
let port = process.env.PORT || 8082; // set our port
let bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));

try {
    app.use(bodyParser.json());
  } catch (e) {
    console.log(e);
  }



let logglyModel = new LogglyModel
  

router.post("/newLog/", function(req, res) {
    
    logglyModel.log(req.body.status, req.body.message)
    
  
    res.status(200).json("OK");
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
