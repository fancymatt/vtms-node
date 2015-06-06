angular.module('vtms').controller('vtmsTeamMemberListController', function($scope, vtmsTeamMember) {
  $scope.teamMembers = vtmsTeamMember.query();
});