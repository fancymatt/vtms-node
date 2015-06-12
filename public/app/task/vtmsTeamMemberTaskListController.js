angular.module('vtms').controller('vtmsTeamMemberTaskListController', function($scope, vtmsTask, vtmsTeamMember, $routeParams) {
  $scope.tasks;
  $scope.teamMember = vtmsTeamMember.get({id: $routeParams.id}, function() {
    $scope.tasks = $scope.teamMember.getTasks();
  });
});