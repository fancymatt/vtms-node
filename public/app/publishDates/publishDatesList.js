angular.module('vtms').directive('publishDatesList', function() {
  return {
    templateUrl: '/partials/publishDates/publish-dates-list',
    restrict: 'E',
    scope: {
      config: '='
    },
    controller: function($scope, $rootScope, vtmsPublishDate, vtmsIdentity) {

      $scope.refresh = function() {
        $scope.publishDateList = $scope.config.update();
      };

      $scope.refresh();

      $scope.identity = vtmsIdentity.currentUser;


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

      $scope.sortOptions = [];

      if($scope.config.sortOptions) {
        if($scope.config.sortOptions.date) $scope.sortOptions.push({value: "date", text: "Sort by Date"});
        if($scope.config.sortOptions.series) $scope.sortOptions.push({value: "lesson.languageSery.series.title", text: "Sort by Series"});
        if($scope.config.sortOptions.number) $scope.sortOptions.push({value: "lesson.number", text: "Sort by Lesson Number"});
        if($scope.config.sortOptions.title) $scope.sortOptions.push({value: "lesson.title", text: "Sort by Lesson Title"});
        if($scope.config.sortOptions.platform) $scope.sortOptions.push({value: ["platform.name", "date"], text: "Sort by Platform"});
        if($scope.config.sortOptions.status) $scope.sortOptions.push({value: "status", text: "Sort by Status"});
        if($scope.config.sortOptions.deliveredOn) $scope.sortOptions.push({value: ["platform.name", "-deliveredTime"], text: "Delivered Time"});
      }

      $scope.sortOrder = $scope.sortOptions[0].value;

      $scope.deliver = function(publishDate) {
        publishDate.deliver().then(function(newData) {
          angular.extend(publishDate, newData);
          $rootScope.$broadcast('publishDate:delivered');
        });
      };

      $scope.delete = function(deletedPublishDate) {
        deletedPublishDate.delete().then(function() {
          removeFromList(deletedPublishDate, $scope.publishDateList);
        });
      };

      /*
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

      $scope.deleteLesson = function(deletedLesson) {
        deletedLesson.delete().then(function() {
          $rootScope.$broadcast('lesson:deleted', deletedLesson);
        });
      };
      */

      /**
       * Listeners
       */
      /*
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

      $rootScope.$on('lesson:deleted', function(event, lesson) {
        removeFromList(lesson, $scope.lessonsList);
      });
      */
    }

  };

});
