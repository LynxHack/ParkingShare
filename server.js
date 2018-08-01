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
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.post('/newspot', function(req, res){
  console.log(dbPost);
  dbPost.insertNewSpot(req.body);
})

app.post('/login', function(req, res){
  
})

app.listen(process.env.PORT || 8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${process.env.PORT || 8080}`);
});