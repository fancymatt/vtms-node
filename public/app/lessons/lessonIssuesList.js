angular.module('vtms').directive('lessonIssuesList', function() {
  return {
    templateUrl: '/partials/lessons/lesson-issues-list',
    restrict: 'E',
    scope: {
      config: '=',
    },
    controller: function($scope, $rootScope, vtmsIssue, vtmsNotifier) {
      
      $scope.refresh = function() {
        $scope.lessonsList = $scope.config.update();
      };
      
      $scope.refresh();
      
      $scope.issuesConfig = {
        title: 'Issues',
        update: function(lessonId) {
          return vtmsIssue.getUnassignedIssuesForLesson({id: lessonId});
        },
        actions: {
          complete: true,
          reassign: true
        },
        columns: {
          actions: true,
          timecode: true,
          issue: true,
          creator: true
        }
      };
    }
  };
   
});