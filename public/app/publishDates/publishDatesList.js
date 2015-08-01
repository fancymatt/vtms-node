angular.module('vtms').directive('publishDatesList', function() {
  return {
    templateUrl: '/partials/publishDates/publish-dates-list',
    restrict: 'E',
    scope: {
      publishDates: '=',
      config: '='
    },
    controller: function($scope, $rootScope, vtmsPublishDate) {

      $scope.publishDateList = $scope.publishDates;
      
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
      
      $scope.deliver = function(publishDate) {
        publishDate.deliver().then(function(newData) {
          angular.extend(publishDate, newData);
          $rootScope.$broadcast('publishDate:delivered');
        });
      };
      
      $scope.delete = function(publishDate) {
        console.log("publish date deleted!");
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
    
  }
  
});