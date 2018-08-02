const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const app = express();
const compiler = webpack(config);

const dbGet = require('./db/helpers/get_data.js');
const dbPost = require('./db/helpers/post_data.js');

var bcrypt = require('bcryptjs');
const saltRounds = 10;

var cookieSession = require('cookie-session')
app.use(cookieSession({
  httpOnly: false,
  name: 'session',
  keys: ['qyjlsfjlon', 'tqbqaqbiop', 'bcjnhmspaz'],

  // Cookie Options - set expirty
  maxAge: 24 * 60 * 60 * 100000 // 24 hours
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('/db/spots', async function(req, res) {
  const results = await dbGet.getAvailableSpots();
  res.json(results);
})

app.get('/', function(req, res) {
  console.log(req.session.user_id);
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// route for user logout
app.post('/logout', (req, res) => {
  console.log("Attempt logout");
  if (req.session.user_id) {
      req.session = null;
      res.status(200).send("Successfully logout of session")
  } else {
      res.status(200).send("Successfully logged out. No cookies already.");
  }
});

app.post('/newspot', function(req, res){
  console.log("server received", req.body)
  dbPost.insertNewSpot(req.body);
})

app.post('/initiallog', function(req, res){
  console.log(req.session.user_id);
  if(!req.session.user_id){
    res.status(401).send("failed")
  }

  dbPost.checkid(req.session.user_id)
  .then((result) => {
    if(result){
      console.log(result);
      res.status(200).send(result[0]);
    }
    else{
      res.status(401).send(result[0]);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(401).send("failed");
  })
})

app.post('/login', function(req, res){
  dbPost.checkcredentials(req.body.email, req.body.password, "")
  .then((result) => {
    if(result){
      console.log("Sending success to client");
      req.session.user_id = result[0].id;
      res.status(200).send(result);
    }
    else {
      res.status(401).send(result);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(401).send("failed");
  })
})

app.post('/register', function(req, res){
  dbPost.registerUser(req.body);
  res.status(200).send("Add user successful!")
})

app.listen(process.env.PORT || 8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${process.env.PORT || 8080}`);
});