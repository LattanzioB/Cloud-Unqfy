let express = require("express"); // import express
let { Notification } = require("./notify");
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
const { getOK } = require("./clients/UnqfyClient");
let port = process.env.PORT || 8081; // set our port
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

try {
  app.use(bodyParser.json());
} catch (e) {
  console.log(e);
}

let notify = new Notification();

router.get("/", function(req, res) {
  res.json({ message: "funcionando" });
});

router.get("/verifyConnection/", function(req, res) {
  getOK();
  res.json({ message: "funcionando desde notify" });
});

router.post("/suscribe/", function(req, res) {
  notify.addSuscriptor(req.body.artistId, req.body.email);
  res.status(200).json("");
});

router.get("/subscriptions/", function(req, res) {
  console.log(req.query.artistId);

  try {
    const suscriptors = notify.getSuscriptorsByArtistId(req.query.artistId);
    res.status(200).json(suscriptors);
  } catch {
    throw new NotFoundError();
  }
});

router.post("/unsubscribe/", function(req, res, next) {
  try {
    console.log(req.body.artistId);

    notify.removeSuscriptor(req.body.artistId, req.body.email);
    res.status(200).json("OK");
  } catch (e) {
    if (e instanceof ErrorNoExisteArtist) {
      next(new NotFoundError());
    }
  }
});

router.delete("/subscriptions/", function(req, res, next) {
  try {
    notify.deleteEmailsFromArtist(req.body.artistId);
    res.status(204).json("OK");
  } catch (e) {
    if (e instanceof ErrorNoExisteArtist) {
      next(new NotFoundError());
    }
  }
});

router.post("/notify/", function(req, res, next) {
  try {
    notify.sendMail(req.body.artistId, req.body.subject, req.body.message);
    res.status(200).json("OK");
  } catch (e) {
    if (e instanceof ErrorNoExisteArtist) {
      next(new NotFoundError());
    }
  }
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
