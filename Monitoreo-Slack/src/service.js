let express = require("express"); // import express
const rp = require('request-promise');
const cron = require('node-cron');
let app = express(); // define our app using express
let router = express.Router();
let bodyParser = require("body-parser");
let {Monitoreo} = require("./monitoreo");
let {SlackClient} = require("./postMessage");
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
const slackClient = new SlackClient()


let task = cron.schedule('* * * * *', () => {
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
    if(result.unqfy == "Service Off" || result.loggly == "Service Off" || result.notification == "Service Off"){
      slackClient.postMessage(`Unqyfy: ${result.unqfy}, Loggly: ${result.loggly}, Notification: ${result.notification}`)
    }
  }
  )});

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
      slackClient.postMessage(`Unqyfy: ${result.unqfy}, Loggly: ${result.loggly}, Notification: ${result.notification}`)
    })
    
  });

  router.post("/activate", function(req, res){
    task.start()
    res.status(204).json("Ok")
  });

  router.post("/deactivate", function(req, res){
    console.log("llegue deactivate")
    task.stop()
    res.status(204).json("Ok")
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
  