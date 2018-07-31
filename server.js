const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

const app = express();
const compiler = webpack(config);

const dbGet = require('./db/helpers/get_data.js');
const dbPost = require('./db/helpers/post_data.js');


var testObject = {
  _ne: {
    lng: -123.204866,
    lat: 49.263466
  },
  _sw: {
    lng: -123.190866,
    lat: 49.263466
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('/db/spots', async function(req, res) {
  let test = await dbGet.getAvailableSpots(testObject);
  res.send(test);
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


app.listen(process.env.PORT || 8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${process.env.PORT || 8080}`);
});