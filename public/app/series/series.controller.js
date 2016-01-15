angular
  .module('vtms')
  .controller('vtmsSeriesDetailController', vtmsSeriesDetailController);

vtmsSeriesDetailController.$inject = ['$routeParams', 'vtmsIdentity', 'vtmsSeries'];

function vtmsSeriesDetailController($routeParams, vtmsIdentity, vtmsSeries) {
  var vm = this;

  vm.getSeries = getSeries;
  vm.identity = vtmsIdentity.currentUser;
  vm.series = {};
  vm.globalTasksList = [];
  vm.languageSeriesList = [];
  vm.sortOptions = [{value: ['title', 'level.number'], text: 'Sort by Title'}, {value: ['language.name', 'level.number'], text: 'Sort by Language'}];
  vm.sortOrder = vm.sortOptions[0].value;
  vm.pageTitle = 'Series Detail';

  activate();

  function activate() {
    getSeries().then(function() {
      console.log('PAGE INITIALIZATION: Returned series');
    });
    getLanguageSeriesList().then(function() {
      console.log('PAGE INITIALIZATION: Returned language series list');
    });
  }

  function getSeries() {
    return vtmsSeries.getById($routeParams.id)
      .then(function(data) {
        vm.series = data;
        return vm.series;
      });
  }

  function getGlobalTasks() {
    return vtmsSeries.getGlobalTasksForSeries($routeParams.id)
      .then(function(data) {
        vm.globalTasksList = data;
        return vm.globalTasksList;
      });
  }

  function getLanguageSeriesList() {
    return vtmsSeries.getLanguageSeriesForSeries($routeParams.id)
      .then(function(data) {
        vm.languageSeriesList = data;
        return vm.languageSeriesList;
      });
  }

  /*
  $scope.newLanguageSeries = {
    numberOfLessons: 5,
    possibleValues: {
      levels: {
        8: 'Intro',
        1: 'Absolute Beginner',
        2: 'Beginner',
        4: 'Lower Intermediate',
        5: 'Intermediate',
        6: 'Upper Intermediate',
        7: 'Advanced'
      },
      numberOfLessons: [5, 10, 12, 13, 15, 20, 25, 50, 100]
    },
    values: {
      fkLanguage: -1,
      fkLevel: -1,
      fkSeries: $routeParams.id,
      title: 'New Language Series'
    }
  };

  vtmsLanguage.query('', function(languages) {
    $scope.newLanguageSeries.possibleValues.languages = languages;
  });

  $scope.createNewLanguageSeries = function() {
    var newValues = $scope.newLanguageSeries.values;
    var lessonsToCreate = $scope.newLanguageSeries.numberOfLessons;

    if(newValues.fkLanguage > -1 && newValues.fkLevel > -1) {
      // Create Language Series
      var newLangaugeSeries = new vtmsLanguageSeries(newValues);
      newLangaugeSeries.$save().then(function(languageSeries) {
        var languageSeriesId = languageSeries.id;
        console.log(languageSeries)

        // Create lessons
        for(var i = 0; i < lessonsToCreate; i++) {
          var lessonNumber = i + 1;
          var newLesson = new vtmsLesson({fkLanguageSeries: languageSeriesId, number: lessonNumber, title: 'Lesson ' + lessonNumber});
          newLesson.$save().then(function(lesson) {
            var taskList = $scope.globalTaskList;
            for (var j = 0; j < taskList.length; j++) {
              var newTask = new vtmsTask({fkLesson: lesson.id, fkTaskGlobal: taskList[j].id, fkTeamMember: taskList[j].defaultTeamMember});
              newTask.$save();
            }

            console.log('Lesson created!');
            console.log(lesson);
          });
        }
      });


      vtmsNotifier.success('Create ' + lessonsToCreate + ' lessons of new Language Series');
    } else {
      vtmsNotifier.error('Please fill in all fields to create a language series.');
    }
  }

  */
};
