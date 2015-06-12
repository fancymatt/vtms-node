var controllers = {};

controllers.activity = require('./activity');
controllers.channel = require('./channel');
controllers.language = require('./language');
controllers.languageSeries = require('./languageSeries');
controllers.lesson = require('./lesson');
controllers.level = require('./level');
controllers.publishDate = require('./publishDate');
controllers.series = require('./series');
controllers.shift = require('./shift');
controllers.task = require('./task');
controllers.teamMember = require('./teamMember');
controllers.user = require('./user');

module.exports = controllers;