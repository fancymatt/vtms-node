angular.module('vtms').controller('vtmsIssueAssignmentController', function($scope, vtmsLesson, $routeParams) {
  
  $scope.lessonListConfig = {
    title: 'Issues',
    update: function() {
      return vtmsLesson.getLessonsWithUnassignedIssues();
    }
  }
});