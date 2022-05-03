const config = require('./config');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, updateDoc, doc } = require("firebase/firestore");


const helpers = require('./helpers');

const db = getFirestore(initializeApp(config.firebaseConfig));

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors({ credentials: true }))

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

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

app.get('/room/:uid', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.params.uid)
  const result = await helpers.findRoom(db, req.params.uid)
  res.status(200).json(result);
});


app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});

app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.listen(port, () =>
  console.log('Express server is running on ', port )
);
