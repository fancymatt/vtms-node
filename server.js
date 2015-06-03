var express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    models = require('./models/models.js');

app.set('view engine', 'jade');
app.set('views', __dirname + '/public/views/');
app.use(logger('dev'));
app.use(bodyParser());
app.use(express.static('public'));

app.get('/partials/*', function(req, res) {
  res.render('../../public/app/' + req.params[0]);
});

var allSeries;
models.Series.findAll().then(function(series) {
  allSeries = series;
});

app.get('*', function(req, res) {
  res.render('layouts/index', {series: allSeries});
});

var port = process.env.PORT || 3030;

app.listen(port);
console.log("Listening on port: " + port);
