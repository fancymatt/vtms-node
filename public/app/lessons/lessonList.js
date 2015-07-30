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
      
      // TODO: Refactor so that issues and tasks get added to the last issue and last task field of a lesson on completion
      // so that we can always get this information while querying a lesson list, and to simplify render queue query
      // Just storing a single fk on lesson for last issue and last task should be good enough.
      
      // Alternatively, could figure out how to pass the view object into the query so it only returns relevant information...?
      
      $scope.addToRenderQueue = function(addedLesson) {
        vtmsLesson.get({id: addedLesson.id}, function(lesson) {
          lesson.addToRenderQueue().then(function(newData) {
            angular.extend(addedLesson, newData);
            $rootScope.$broadcast('lesson:addedToQueue', lesson);
            
          });
        });
      };
      
      $scope.removeFromRenderQueue = function(removedLesson) {
        vtmsLesson.get({id: removedLesson.id}, function(lesson) {
          lesson.removeFromRenderQueue().then(function(newData) {            
            angular.extend(removedLesson, newData);
            $rootScope.$broadcast('lesson:removedFromQueue', lesson);
            
          });
        });
      };

      $scope.markAsExported = function(exportedLesson) {
        vtmsLesson.get({id: exportedLesson.id}, function(lesson) {
          lesson.markAsExported().then(function(newData) {
            angular.extend(exportedLesson, newData);
            $rootScope.$broadcast('lesson:successfullyExported', lesson);
          });
        });
      };
      
      /**
       * Listeners
       */
      
      $rootScope.$on('lesson:addedToQueue'), function(event, lesson) {
        console.log("lesson:addedToQueue heard");
        if($scope.config.type === 'renderQueuePending') removeFromList(lesson, $scope.lessonList);
        if($scope.config.type === 'renderQueue') addToList(lesson, $scope.lessonList);
      };
      
      $rootScope.$on('lesson:removedFromQueue'), function(event, lesson) {
        console.log("lesson:removedFromQueue heard");
        if($scope.config.type === 'renderQueuePending') addToList(lesson, $scope.lessonList);
        if($scope.config.type === 'renderQueue') removeFromList(lesson, $scope.lessonList);
      };
      
      $rootScope.$on('lesson:successfullyExported'), function(event, lesson) {
        console.log("lesson:successfullyExported heard");
        if($scope.config.type === 'renderQueue') removeFromList(lesson, $scope.lessonList);
      };
    }
  }
});
      
      