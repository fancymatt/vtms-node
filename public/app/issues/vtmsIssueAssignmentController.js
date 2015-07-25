angular.module('vtms').controller('vtmsIssueAssignmentController', function($scope, vtmsLesson) {
  $scope.lessons = vtmsLesson.getIssues();
  
  $scope.config = {
    actions: {
      complete: true,
      delete: true,
      reassign: true,
      getTime: false
    },
    columns: {
      task: true,
      timecode: true,
      issue: true,
      status: true,
      creator: true
    }
  }
});