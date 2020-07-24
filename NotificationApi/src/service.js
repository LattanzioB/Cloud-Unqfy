let express = require("express"); // import express
let { Notification } = require("./notify");
let app = express(); // define our app using express
let router = express.Router();
const rp = require("request-promise");
const {
  NotFoundError,
  NotFoundRelatedError,
  AlreadyExistError,
  BadRequestError,
  UnexpectedFailureError,
  InvalidJsonError
} = require("./APIError");
const {
  ErrorArtistaRepetido,
  ErrorNoExisteArtist,
  ErrorTrackRepetido,
  ErrorNoExisteAlbum,
  ErrorNoExisteTrack,
  ErrorAlbumRepetido,
  ErrorParametrosInsuficientes,
  ErrorNoExisteEmail
} = require("./Error");
const { ErrorHandler } = require("./ErrorHandler");
const { getOK, searchArtistByName } = require("./clients/UnqfyClient");
let port = process.env.PORT || 8081; // set our port
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

try {
  app.use(bodyParser.json());
} catch (e) {
  console.log(e);
}

let notify = new Notification();

router.get("/statusCheck/", function(req, res) {
  res.json({ message: "funcionando" });
});

router.get("/verifyConnection/", function(req, res) {
  getOK();
  res.json({ message: "funcionando desde notify" });
});

//-----------------------------------------------------------------------------------------------

router.post("/suscribe/", function(req, res) {
  notify
    .addSuscriptor(req.body.artistId, req.body.email)
    .then(respuesta => {
      res.status(200).json("");
    })
    .catch(e => {
      res.status(e.status).json(e.errorCode);
    });
});

//-----------------------------------------------------------------------------------------------

router.post("/unsubscribe/", function(req, res, next) {
  try {
    notify.removeSuscriptor(req.body.artistId, req.body.email);
    res.status(200).json("OK");
  } catch (e) {
    if ((!req.body.artistId && req.body.artistId != 0) || !req.body.email) {
      next(new BadRequestError());
    } else if (
      e instanceof ErrorNoExisteEmail ||
      e instanceof ErrorNoExisteArtist
    ) {
      next(new NotFoundError());
    }
  }
});

//-----------------------------------------------------------------------------------------------

router.get("/subscriptions/", function(req, res) {
  try {
    const suscriptors = req.query.artistId
      ? notify.getSuscriptorsByArtistId(req.query.artistId)
      : notify.suscriptors;
    res.status(200).json(suscriptors);
  } catch {
    throw new NotFoundError();
  }
});

router.delete("/subscriptions/", function(req, res, next) {
  try {
    notify.deleteEmailsFromArtist(Number(req.query.artistId));
    res.status(204).json("OK");
  } catch (e) {
    if (e instanceof ErrorNoExisteArtist) {
      next(new NotFoundError());
    }
  }
});

router.post("/notify/", function(req, res, next) {
  console.log("apinotify");

  try {
    notify.sendMail(
      Number(req.query.artistId),
      req.query.subject,
      req.query.message
    );
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
