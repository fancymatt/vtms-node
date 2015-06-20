angular.module('vtms').controller('vtmsTeamMemberTaskListController', function($scope, vtmsTeamMember, vtmsTask, vtmsIdentity, $routeParams, $location) {
  
  $scope.identity = vtmsIdentity.currentUser;
  $scope.teamMember = vtmsTeamMember.get({id: $scope.identity.fkTeamMember});
  $scope.actionableTasks = vtmsTask.getActionableTasksForMember({id: $scope.identity.fkTeamMember});
  $scope.activeTasks = vtmsTask.getActiveTasksForMember({id: $scope.identity.fkTeamMember});
  
  $scope.sortOptions = [
    {value: "dueDate()", text: "Sort by Due Date"},
    {value: "taskGlobal.name", text: "Sort by Task Type"}
  ];
  
  $scope.selectedSortOption = $scope.sortOptions[0].value;
});