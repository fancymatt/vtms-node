angular.module('vtms').directive('teamMemberIssuesList', function() {
  return {
    templateUrl: '/partials/teamMembers/team-member-issues-list',
    restrict: 'E',
    scope: {
      config: '=',
    },
    controller: function($scope, $rootScope, vtmsIssue, vtmsNotifier) {
      
      $scope.refresh = function() {
        $scope.taskList = $scope.config.update();
      };
      
      $scope.refresh();
      
      
      $scope.issuesConfig = {
        title: 'Issues',
        update: function(taskId) {
          return vtmsIssue.getIssuesForTask({id: taskId});
        },
        actions: {
          complete: true,
        },
        columns: {
          timecode: true,
          issue: true,
          creator: true
        }
      };
    }
  };
   
});