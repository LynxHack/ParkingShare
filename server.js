const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
<<<<<<< HEAD
=======
const bcrypt = require('bcryptjs');
>>>>>>> feature/userPage
const cookieSession = require('cookie-session') ;
const app = express();
const compiler = webpack(config);
const dbGet = require('./db/helpers/get_data.js');
const dbPost = require('./db/helpers/post_data.js');
const getUsers = require('./db/helpers/get_users.js');
//use the cookiesession
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))


let printUsers = getUsers.getUsers();
console.log('this is the email thins' , printUsers);


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

<<<<<<< HEAD
app.post('/newspot', function(req, res){
  console.log(dbPost);
  dbPost.insertNewSpot(req.body);
=======
app.post("/login" , function (req, res) {
  let userEmail = req.body.email ;
  let userPassword = req.body.password ;
  let user;
  for(let userId in users) {
    if(users[userId].email === req.body.email) {
      user = users[userId] ;
    }
  }
  if(user){

    console.dir(user, { colors: true });
    if(bcrypt.compareSync(userPassword , user.hashedPassword)){
      req.session.user_id = user.id ;
      res.redirect('/urls') ;
    } else {
      res.status(403).send('Invalid Login , Check your login info') ;
    }
    } else {
        res.status(403).send('User does not exist , Check your login info') ;
      }
>>>>>>> feature/userPage
})


app.listen(process.env.PORT || 8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${process.env.PORT || 8080}`);
});