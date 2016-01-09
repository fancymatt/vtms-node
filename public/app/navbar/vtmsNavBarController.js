angular.module('vtms').controller('vtmsNavBarController', function($scope, $http, vtmsTeamMember, vtmsIdentity, $location) {
  $scope.identity = vtmsIdentity;
  $scope.teamMembers = vtmsTeamMember.query();
});
