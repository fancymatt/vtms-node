angular.module('vtms').directive('lessonsList', function() {
  return {
    templateUrl: "/partials/lessons/lessons-list",
    restrict: "E",
    scope: {
      languageSeries: '=',
      lessons: '=',
      config: '=',
      updateFn: '&'
    },
    controller: function($scope, $rootScope, vtmsLesson, vtmsNotifier) {
      
      /**
       * Data Initialization
       */
      
      // Ensure that $scope.lessons is populated even if just the languageSeries was passed in
      if($scope.lessons) {
        $scope.lessonsList = $scope.lessons;
      } else {
        $scope.lessonsList = vtmsLesson.getList({id: $scope.languageSeries.id});
      }
      
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
          return true;
        }
      };
      
      $scope.refreshList = function() {
        $scope.lessonsList = $scope.updateFn();
      };
      
      var checkLessonCompletionStatus = function(task) {
        // Get all tasks from that lesson and update benchmarks
        vtmsTask.getList({id: task.fkLesson}, function(tasks) {
          vtmsLesson.get({id: task.fkLesson}, function(lesson) {
            lesson.updateBenchmarks(tasks);
          });
        });
      };
      
      $scope.addToRenderQueue = function(addedLesson) {
        addedLesson.addToRenderQueue().then(function(newData) {
          angular.extend(addedLesson, newData);
          $rootScope.$broadcast('lesson:addedToRenderQueue', addedLesson);
        });
      };
      
      $scope.removeFromRenderQueue = function(removedLesson) {
        removedLesson.removeFromRenderQueue().then(function(newData) {
          angular.extend(removedLesson, newData);
          $rootScope.$broadcast('lesson:removedFromRenderQueue', removedLesson);
        });
      };
      
      $scope.markAsExported = function(exportedLesson) {
        exportedLesson.markAsExported().then(function(newData) {
          angular.extend(exportedLesson, newData);
          $rootScope.$broadcast('lesson:exported', exportedLesson);
        });
      };
      
      $scope.markAsVideoChecked = function(videoCheckedLesson) {
        videoCheckedLesson.markAsVideoChecked().then(function(newData) {
          angular.extend(videoCheckedLesson, newData);
          $rootScope.$broadcast('lesson:videoChecked', videoCheckedLesson);
        });
      };
      
      $scope.markAsLanguageChecked = function(languageCheckedLesson) {
        languageCheckedLesson.markAsLanguageChecked().then(function(newData) {
          $rootScope.$broadcast('lesson:languageChecked', languageCheckedLesson);
        });
      };
      
      $scope.markAsArchived = function(archivedLesson) {
        archivedLesson.markAsArchived().then(function(newData) {
          angular.extend(archivedLesson, newData);
          $rootScope.$broadcast('lesson:archived', archivedLesson);
        });
      };
      
      $scope.deleteLesson = function(deletedLesson) {
        deletedLesson.delete().then(function() {
          $rootScope.$broadcast('lesson:deleted', deletedLesson);
        });
      };
     
      
      /**
       * Listeners
       */
            
      $rootScope.$on('lesson:addedToRenderQueue', function(event, lesson) {
        if($scope.config.type === 'renderQueue') addToList(lesson, $scope.lessonsList);
        if($scope.config.type === 'lessonsToRender') removeFromList(lesson, $scope.lessonsList);
      });
            
      $rootScope.$on('lesson:removedFromRenderQueue', function(event, lesson) {
        if($scope.config.type === 'renderQueue') removeFromList(lesson, $scope.lessonsList);
        if($scope.config.type === 'lessonsToRender') addToList(lesson, $scope.lessonsList);
      });
      
      $rootScope.$on('lesson:exported', function(event, lesson) {
        if($scope.config.type === 'renderQueue') removeFromList(lesson, $scope.lessonsList);
      });
      
      $rootScope.$on('lesson:videoChecked', function(event, lesson) {
        if($scope.config.type === 'archivableLessons') addToList(lesson, $scope.lessonsList);
        if($scope.config.type === 'videoCheckLessons') removeFromList(lesson, $scope.lessonsList);
      });
      
      $rootScope.$on('lesson:languageChecked', function(event, lesson) {
        if($scope.config.type === 'languageCheckLessons') removeFromList(lesson, $scope.lessonsList);
      });
      
      $rootScope.$on('lesson:archived', function(event, lesson) {
        if($scope.config.type === 'archivableLessons') removeFromList(lesson, $scope.lessonsList);
      });
      
      $rootScope.$on('lesson:deleted', function(event, lesson) {
        removeFromList(lesson, $scope.lessonsList);
      });
      
    }
  }
});