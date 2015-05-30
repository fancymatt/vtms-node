var express = require('express'),
    app = express(),
    lessonDbController = require('./controllers/lessonDbController.js'),
    lessonController = require('./controllers/lessonController.js'),
    seriesController = require('./controllers/seriesController.js'),
    languageSeriesController = require('./controllers/languageSeriesController.js'),
    mainController = require('./controllers/mainController.js');

app.set('view engine', 'jade');

app.use(express.static('public'));

// Routes
app.use('/db', lessonDbController);
app.use('/series', seriesController);
app.use('/languageSeries', languageSeriesController);
app.use('/lesson', lessonController);
app.use('/', mainController);

app.listen(8080);