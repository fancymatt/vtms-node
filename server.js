var express = require('express'),
    app = express(),
    series = require('./controllers/series.js'),
    home = require('./controllers/home.js'),
    lessons = require('./controllers/lessons.js');

app.set('view engine', 'jade');

app.use(express.static('public'));

// Routes
app.use('/series', series);
app.use('/', home);

app.listen(8080);