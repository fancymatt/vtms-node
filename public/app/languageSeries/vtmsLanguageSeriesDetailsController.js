angular.module('vtms').controller('vtmsLanguageSeriesDetailController', function($scope, vtmsLanguageSeries, vtmsGlobalTask, vtmsLesson, vtmsTask, $routeParams, vtmsNotifier, vtmsIdentity) {

  $scope.identity = vtmsIdentity.currentUser;

  $scope.sortOptions = [
    {value: "number", text: "Sort by Number"},
    {value: "trt", text: "Sort by Length"},
    {value: "title", text: "Sort by Title"}
  ];

  $scope.selectedSortOption = $scope.sortOptions[0].value;

  $scope.languageSeries = vtmsLanguageSeries.get({id: $routeParams.id}, function(languageSeries) {
    $scope.globalTaskList = vtmsGlobalTask.getListForSeries({id: languageSeries.fkSeries});
  });

  $scope.lessonsConfig = {
    title: 'Lessons',
    update: function() {
      return vtmsLesson.getList({id: $routeParams.id});
    },
    sortable: true,
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false,
      delete: true
    },
    sortOptions: {
      number: true
    },
    columns: {
      actions: true,
      series: false,
      number: true,
      title: true,
      lastRender: false,
      lastAction: false,
      queuedTime: false,
      trt: true,
      dueDate: true,
      status: true
    }
  };

  $scope.globalTaskList =

  $scope.newLessons = {
    selectedNumber: 0,
    currentMaxNumber: 0,
    possibleValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 50, 100]
  };

  $scope.createNewLessons = function() {
    if($scope.newLessons.selectedNumber > 0) {
      console.log($scope.globalTaskList);
      vtmsLesson.getList({id: $routeParams.id}, function(list) {
        var maxLesson = list.length;

        for(var i = 0; i < $scope.newLessons.selectedNumber; i++) {

          var lessonNumber = i + maxLesson + 1;
          var newLesson = new vtmsLesson({fkLanguageSeries: $routeParams.id, number: lessonNumber, title: "Lesson " + lessonNumber});
          newLesson.$save().then(function(lesson) {
            var taskList = $scope.globalTaskList;
            for (var j = 0; j < taskList.length; j++) {
              var newTask = new vtmsTask({fkLesson: lesson.id, fkTaskGlobal: taskList[j].id, fkTeamMember: taskList[j].defaultTeamMember});
              newTask.$save();
            }

            console.log("Lesson created!");
            console.log(lesson);
          });
        }
        vtmsNotifier.success("Create " + $scope.newLessons.selectedNumber + " lessons in this language series");
      });
    } else {
      vtmsNotifier.error("Please select a number greater than 0 to create a language series.");
    }
  }

  $scope.update = function(newData) {

    angular.extend($scope.languageSeries, newData);

    $scope.languageSeries.update(newData).then(function() {
      var string = "Updated Language Series: ";
      for(var key in newData) {
        string += key + " changed to \"" + newData[key] + "\" ";
      }
      vtmsNotifier.notify(string);
    }, function(reason) {
      vtmsNotifier.error(reason);
    });
  };

});