angular.module('vtms').controller('vtmsNavBarController', function($scope, $http, vtmsTeamMember, $location) {
  $scope.teamMembers = vtmsTeamMember.query();
});