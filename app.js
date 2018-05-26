const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const Newartist = require('./serverModels/artistsModel');
const app = express();

const artists = require('./routes/artists');

const shows = require('./routes/shows');

// const url = 'mongodb://localhost/secreStage';
const url = 'mongodb://teamsecretstage:1234@ds157528.mlab.com:57528/secretstagedb';
// const url = 'https://api.mlab.com/api/1/databases/my-db/collections/artist?apiKey=ofBQUpc-sF_QVtu0hsRurzAeiyNMNP37';



mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/artists', artists);

app.use('/api/shows', shows);

// const addArtist = new Newartist(req.body);
// addArtist.save(err => {  
//   if (err) return res.status(500).send(err);
//   return res.status(200).send(addArtist);
// });



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log("error");
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;