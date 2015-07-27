angular.module('vtms').directive('lessonList', function() {
  return {
    templateUrl: "/partials/lessons/lesson-list",
    restrict: "E",
    scope: {
      languageSeries: '=',
      lessons: '=',
      config: '='
    },
    controller: function($scope, $rootScope, vtmsTask, vtmsLesson, vtmsNotifier) {
      
      /**
       * Data Initialiazation
       */
      
      // Ensure that $scope.tasks is populated even if just the task was passed in
      if($scope.lessons) {
        // Just use those tasks
        $scope.lessonList = $scope.lessons;
      } else {
        // We must be passing in the lesson, so get those tasks
        $scope.lessonList = vtmsLesson.getList({id: $scope.languageSeries.id});
      }
      
      // Grab any additional data that certain functionality requires
      
      // TODO: Figure out how to offload this into a config option
      $scope.sortOptions = [
        {value: "number", text: "Sort by Number"},
        {value: "trt", text: "Sort by Length"},
        {value: "title", text: "Sort by Title"}
      ];

      $scope.selectedSortOption = $scope.sortOptions[0].value;
      
      
      /**
       * Private Functions
       */
      
      var findIdOnList = function(id, list) {
        for(var i = 0; i < list.length; i++) {
          if(id === list[i].id) {
            return i;
          }
        }
        return -1;
      };
      
      var removeFromList = function(item, list) {
        var indexToDelete = findIdOnList(item.id, list);
        if(indexToDelete > -1) {
          list.splice(indexToDelete, 1);
          console.log(list.length);
          return true;
        } else {
          return false;
        }
      };

      var addToList = function(item, list) {
        if(findIdOnList(item.id, list) > -1) {
          return false;
        } else {
          list.push(item);
          console.log(list.length);
          return true;
        }
      };
      
      
      /**
       * Public Functions
       */
      
      
    }
  }
});
      
      