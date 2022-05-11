const config = require('./config');
const express = require('express');
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, updateDoc, doc } = require("firebase/firestore");
const { Server } = require('socket.io');
const serveStatic = require('serve-static')
Object.assign(global, { WebSocket: require('ws') });

require('dotenv').config()

const helpers = require('./helpers');

const db = getFirestore(initializeApp(config.firebaseConfig));
const allowedOrigins = ['http://localhost:3000'];
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(serveStatic(path.join(__dirname, 'public')))
app.use(serveStatic(path.join(__dirname, 'node_modules/twilio-video/dist/')))
app.use(serveStatic(path.join(__dirname, 'node_modules/@twilio/video-processors/dist/build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const options = {
  origin: allowedOrigins
};
app.use(cors(options));

app.post('/login/user', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const user = {
    name: req.body.DisplayName,
    imgURL: req.body.ImgURL
  }

  const userFromDB = await helpers.findUser(db, user)

  if (userFromDB && helpers.hasUserDataChanged(user, userFromDB)) {
    // const userRef = doc(db, "users", userFromDB.uid);
    // await updateDoc(userRef, {displayName: user.displayName}, {imgURL: user.imgURL});
    res.status(200).send("Ok");
  } else {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        DisplayName: user.name,
        ImgURL: user.imgURL
      });
      res.status(200).send("Ok");
    } catch (e) {
      console.error("Error adding document: ", e);
      res.status(403).send("Error");
    }

  }
});

app.post('/room/createRoom', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log("Name of room: ", req.headers.nameRoom)

  const userIdentity = req.body.userName;
  const roomSID = req.body.roomSID;
  const token = videoToken(userIdentity, roomSID, config);

  const url = helpers.generateUrl()

  res.send(
    JSON.stringify({
      token: token.toJwt(),
      urlRoom: url
    }));
});

app.post('/room/saveRoom', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const room = await helpers.findRoom(db, req.body.url)

  if(room) {
    res.status(200).send("Ok");
    return
  }

  const userIdentity = req.body.userIdentity;
  const url = req.body.url;
  const roomName = req.body.roomName;
  const roomSID = req.body.roomSID;

  const responseOK = await helpers.saveNewRoom(db, userIdentity, url, roomSID, roomName)

  if(responseOK) {
    res.status(200).send("Ok");
  } else{
    res.status(403).send("Error");
  }
});

app.post('/room/loadRoom', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const room = await helpers.findRoom(db, req.body.url)

  if(room === null || room.roomSID === null) {
    res.status(403).send("Error");
  }

  const userIdentity = req.body.userIdentity;
  const roomSID = room.roomSID;
  const token = videoToken(userIdentity, roomSID, config);

  res.send(
    JSON.stringify({
      token: token.toJwt(),
      nameRoom: room.nameRoom
    }));
});

app.get('/room/:uid', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.params.uid)
  const result = await helpers.findRoom(db, req.params.uid)
  res.status(200).json(result);
});


app.post('/video/connect', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const userIdentity = req.body.identity;
  const roomSID = req.body.roomSID;
  const token = videoToken(userIdentity, roomSID, config);

  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
});

const server = app.listen(port, () =>
  console.log('Express server is running on ', port)
);

const io = new Server(server);



