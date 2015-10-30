angular.module('vtms').controller('vtmsSeriesDetailController', function($scope, vtmsSeries, vtmsIdentity, vtmsLanguage, vtmsLanguageSeries, vtmsNotifier, $routeParams) {
  $scope.series = vtmsSeries.get({id: $routeParams.id});
  $scope.languageSeriesList = vtmsLanguageSeries.getList({id: $routeParams.id});

  $scope.sortOptions = [
    {value: ["title", "level.number"], text: "Sort by Title"},
    {value: ["language.name", "level.number"], text: "Sort by Language"}
  ];

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
      title: "New Language Series"
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
          console.log("Create lesson #" + lessonNumber + " for language series " + languageSeriesId);
        }
      });


      vtmsNotifier.success("Create " + lessonsToCreate + " lessons of new Language Series");
    } else {
      vtmsNotifier.error("Please fill in all fields to create a language series.");
    }
  }

  $scope.selectedSortOption = $scope.sortOptions[0].value;
  $scope.identity = vtmsIdentity.currentUser;
});
