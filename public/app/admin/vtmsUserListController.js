angular.module('vtms').controller('vtmsUserListController', function($scope, vtmsUser, vtmsTeamMember) {
  $scope.users = vtmsUser.query();
  
  $scope.teamMembers = vtmsTeamMember.query();
});