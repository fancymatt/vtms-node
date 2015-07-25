angular.module('vtms').controller('vtmsIssueAssignmentController', function($scope, vtmsLesson) {
  $scope.lessons = vtmsLesson.getIssues();
});