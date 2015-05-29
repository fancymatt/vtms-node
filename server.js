var express = require('express'),
    app = express(),
    series = require('./controllers/series.js'),
    lessons = require('./controllers/lessons.js');

app.set('view engine', 'jade');

app.use(express.static('public'));

// Routes
app.use('/', series);

app.listen(8080);