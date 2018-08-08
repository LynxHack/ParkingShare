const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const app = express();
const compiler = webpack(config);

const dbGet = require('./db/helpers/get_data.js');
const dbPost = require('./db/helpers/post_data.js');

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

app.use(fileUpload());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('/db/spots', async function(req, res) {
  let bounds = JSON.parse(req.query.bounds);
  console.log(`To server ${bounds}`);

  const results = await dbGet.getAvailableSpots(bounds, req.query.starttime, req.query.endtime);
  res.json(results);
})

app.get('/db/spots/user', async function(req, res) {
  let results = await dbGet.getUserSpots(req.session.user_id)
  if (results) {
    res.status(200).json(results)
  } else {
    res.status(404).send('Unable to retrienve any parking spots associated to user')
  }
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



app.post('/getvehicles', (req, res) => {
  dbGet.getVehicles(req.session.user_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("error retrieving client vehicles");
      res.status(404).send(err);
    })
});

app.post('/addvehicle', (req, res) => {
  dbPost.addvehicle(req.body.make,req.body.model,req.body.color,req.body.licenseplate)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log("error adding a client vehicle");
    res.status(404).send(err);
  })
})


app.post('/parkingid', (req, res) => {
  dbGet.getParkingDetails(req.body.parkingid)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(404).send(err);
  })
})

app.post('/reserve', (req, res) => {
  console.log("Making reservation for user", req.session.user_id)
  dbPost.makereservation(req.body.parkingid, req.session.user_id)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(403).send(err);
  })
});

app.post('/getreviews', (req, res) => {
  console.log('Server retrieving reviews for parkingid', req.body.parkingid);
  dbGet.getReviews(req.body.parkingid)
  .then((result) => {
    console.log(result);
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(404).send(err);
  })
})

app.post('/getreservations', (req, res) => {
  dbGet.getReservations(req.session.user_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("error retrieving client reservations");
      res.status(404).send(err);
    })
});

app.post('/reservations/incoming', (req, res) => {
  dbGet.getIncomingReservations(req.session.user_id)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log(`Error getting incoming reservations ${err}`);
    res.status(404).send(err)
  })
})

// route for user logout
app.post('/logout', (req, res) => {
  if (req.session.user_id) {
    req.session = null;
    res.status(200).send("Successfully logout of session")
  } else {
    res.status(200).send("Successfully logged out. No cookies already.");
  }
});

app.post('/newspot', function(req, res) {
  dbPost.insertNewSpot(req.body);
  res.status(200).send("Ok");

})

app.post('/initiallog', function(req, res) {
  if (!req.session.user_id) {
    res.status(401).send("failed")
  }

  dbPost.checkid(req.session.user_id)
    .then((result) => {
      if (result) {
        res.status(200).send(result[0]);
      } else {
        res.status(401).send(result[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post('/login', function(req, res) {
  dbPost.checkcredentials(req.body.email, req.body.password, "")
    .then((result) => {
      if (result) {
        req.session.user_id = result[0].id;
        res.status(200).send(result);
      } else {
        res.status(401).send(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send("failed");
    })
})

app.post('/addreview', function(req, res){
  dbPost.addreview(req.body.rating, req.body.description, req.body.parkingid, req.session.user_id)
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(401).send("failed to add review");
  })
});

app.post('/register', function(req, res) {
  dbPost.registerUser(req.body);
  res.status(200).send("Add user successful!")
})

app.post('/upload/userspot', (req, res, next) => {
  console.log(req.files);
  
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `public/${req.body.filename}.jpg` });
  });

})

app.listen(process.env.PORT || 8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${process.env.PORT || 8080}`);
});