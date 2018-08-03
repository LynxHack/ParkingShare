const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const cookieSession = require('cookie-session') ;
const app = express();
const compiler = webpack(config);

const dbGet = require('./db/helpers/get_data.js');
const dbPost = require('./db/helpers/post_data.js');

var bcrypt = require('bcryptjs');
const saltRounds = 10;


app.use(cookieSession({
  name: 'session',
  keys: ['qyjlsfjlon', 'tqbqaqbiop', 'bcjnhmspaz'],

  // Cookie Options - set expirty
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
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
  const results = await dbGet.getAvailableSpots(req.query.starttime, req.query.endtime);
  res.json(results);
})

app.get('/', function(req, res) {
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
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
});

app.post('/newspot', function(req, res){
  console.log("server received", req.body)
  dbPost.insertNewSpot(req.body);
})

app.post('/login', function(req, res){
  console.log(req.body);
  dbPost.checkcredentials(req.body.email, req.body.password)
  .then((result) => {
    if(result){
      req.session.email = req.body.email;
      res.status(200).send("Successful credential check")
    }
  
    else {
      res.status(200).send("Authentication failed");
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(200).send("Authentication failed");
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