angular.module('vtms').directive('lessonsList', function() {
  return {
    templateUrl: "/partials/lessons/lessons-list",
    restrict: "E",
    scope: {
      languageSeries: '=',
      config: '=',
    },
    controller: function($scope, $rootScope, vtmsLesson, vtmsNotifier) {
      
      /**
       * Data Initialization
       */
      
      $scope.refresh = function() {
        $scope.lessonsList = $scope.config.update();
      };
      
      $scope.refresh();
      
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
      
      $scope.sortOptions = [{value: "dueDate()", text: "Sort by Due Date"}];
      
      if($scope.config.sortOptions) {
        if($scope.config.sortOptions.number) $scope.sortOptions.push();
        if($scope.config.sortOptions.qaLog) $scope.sortOptions.push({value: "qaLog", text: "Sort by QA Log"});
        if($scope.config.sortOptions.languageSeries) $scope.sortOptions.push({value: "languageSery.title", text: "Sort by Series"});
        if($scope.config.sortOptions.language) $scope.sortOptions.push({value: ['languageSery.language.name', 'languageSery.title', 'number'], text: "Sort by Language"});
      }
      
      $scope.sortOrder = $scope.sortOptions[0].value;
      
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
      
      $scope.updateQaLog = function(lesson, event) {
        for(var i = 0; i < event.target.classList.length; i++) {
          if(event.target.classList[i] === 'ng-dirty') {
            lesson.update({qaLog: lesson.qaLog}).then(function() {
              vtmsNotifier.success("Updated QA Log: " + lesson.qaLog);
            });
          }
        }
      };
      
      $scope.updateQaUrl = function(lesson, event) {
        for(var i = 0; i < event.target.classList.length; i++) {
          if(event.target.classList[i] === 'ng-dirty') {
            lesson.update({qaUrl: lesson.qaUrl}).then(function() {
              vtmsNotifier.success("Updated QA URL: " + lesson.qaUrl);
            });
          }
        }
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