var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');

var models = {};

models.Series = require('./Series.js');
models.LanguageSeries = require('./LanguageSeries.js');
models.Lesson = require('./Lesson.js');
models.Language = require('./Language.js');
models.Level = require('./Level.js');
models.Shot = require('./Shot.js');
models.User = require('./User.js');
models.Shift = require('./Shift.js');
models.Activity = require('./Activity.js');
models.Channel = require('./Channel.js');
models.Talent = require('./Talent.js');
models.Task = require('./Task.js');
models.TaskComment = require('./TaskComment.js');
models.TaskGlobal = require('./TaskGlobal.js');
models.TeamMember = require('./TeamMember.js');
models.PublishDate = require('./PublishDate.js');

models.Series.hasMany(models.LanguageSeries, { foreignKey: 'fkSeries' } );
models.Series.hasMany(models.TaskGlobal, { foreignKey: 'fkSeries' } );

models.LanguageSeries.belongsTo(models.Series, { foreignKey: 'fkSeries' } );
models.LanguageSeries.belongsTo(models.Language, { foreignKey: 'fkLanguage' } );
models.LanguageSeries.belongsTo(models.Level, { foreignKey: 'fkLevel' } );
models.LanguageSeries.belongsTo(models.Talent, { foreignKey: 'fkTalent' } );
models.LanguageSeries.belongsTo(models.Channel, { foreignKey: 'fkChannel'} );
models.LanguageSeries.hasMany(models.Lesson, { foreignKey: 'fkLanguageSeries' } );

models.Lesson.belongsTo(models.LanguageSeries, { foreignKey: 'fkLanguageSeries'} );
models.Lesson.hasMany(models.Shot, { foreignKey: 'fkLesson' } );
models.Lesson.hasMany(models.Task, { foreignKey: 'fkLesson' } );
models.Lesson.hasMany(models.PublishDate, {foreignKey: 'fkLesson'} );

models.Language.hasMany(models.LanguageSeries, { foreignKey: 'fkLanguage' } );

models.Level.hasMany(models.LanguageSeries, { foreignKey: 'fkLevel' } );

models.Shot.belongsTo(models.Lesson, { foreignKey: 'fkLesson' } );
models.Shot.belongsTo(models.Talent, { foreignKey: 'fkTalent' } );

//models.User.belongsTo(models.TeamMember, { foreignKey: 'fkTeamMember' } );

models.Shift.belongsTo(models.Activity, { foreignKey: 'fkShift' } );

models.Activity.belongsTo(models.Shift, { foreignKey: 'fkShift' } );
models.Activity.hasMany(models.TaskComment, { foreignKey: 'fkActivity' } );
// Activity Foreign Keys may need to be modeled differently

models.Channel.hasMany(models.LanguageSeries, { foreignKey: 'fkChannel' } );

models.Talent.hasMany(models.Shot, { foreignKey: 'fkTalent' } );

models.Task.belongsTo(models.TaskGlobal, { foreignKey: 'fkTaskGlobal' } );
models.Task.belongsTo(models.Lesson, { foreignKey: 'fkLesson' } );
models.Task.belongsTo(models.TeamMember, { foreignKey: 'fkTeamMember' } );
models.Task.hasMany(models.TaskComment, { foreignKey: 'fkTask' } );

models.TaskComment.belongsTo(models.Task, { foreignKey: 'fkTask' } );
models.TaskComment.belongsTo(models.Activity, { foreignKey: 'fkActivity' } );

models.TaskGlobal.hasMany(models.Task, { foreignKey: 'fkTaskGlobal' } );
models.TaskGlobal.belongsTo(models.Series, { foreignKey: 'fkSeries' } );

//models.TeamMember.hasMany(models.User, { foreignKey: 'fkTeamMember' } );
models.TeamMember.hasMany(models.Shift, { foreignKey: 'fkTeamMember' } );
models.TeamMember.hasMany(models.Task, { foreignKey: 'fkTeamMember' } );

models.PublishDate.belongsTo(models.Lesson, { foreignKey: 'fkLesson'} ); 

module.exports = models;