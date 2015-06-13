angular.module('vtms').controller('vtmsTeamMemberDetailsController', function($scope, vtmsTeamMember, vtmsTask, $routeParams) {
  $scope.teamMember = vtmsTeamMember.get({id: $routeParams.id});
  $scope.tasks = vtmsTask.getListForMember({id: $routeParams.id});
  
  $scope.sortOptions = [
    {value: "dueDate()", text: "Sort by Due Date"},
    {value: "taskGlobal.name", text: "Sort by Task"}
  ];
  
  $scope.selectedSortOption = $scope.sortOptions[0].value;
});