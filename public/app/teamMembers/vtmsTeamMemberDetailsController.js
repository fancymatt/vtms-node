angular.module('vtms').controller('vtmsTeamMemberDetailsController', function($scope, vtmsTeamMember, vtmsTask, $routeParams) {
  $scope.teamMember = vtmsTeamMember.get({id: $routeParams.id});
  $scope.actionableTasks = vtmsTask.getActionableTasksForMember({id: $routeParams.id});
  $scope.activeTasks = vtmsTask.getActiveTasksForMember({id: $routeParams.id});
  
  $scope.sortOptions = [
    {value: "dueDate()", text: "Sort by Due Date"},
    {value: "taskGlobal.name", text: "Sort by Task Type"}
  ];
  
  $scope.selectedSortOption = $scope.sortOptions[0].value;
});