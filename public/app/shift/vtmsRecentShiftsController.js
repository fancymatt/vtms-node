angular.module('vtms').controller('vtmsRecentShiftsController', function($scope, vtmsShift, $routeParams) {
  $scope.shifts = vtmsShift.query();
  
  $scope.sortOptions = [
    {value: "title", text: "Sort by Title"},
    {value: "language.name", text: "Sort by Language"}
  ];
  
  $scope.selectedSortOption = $scope.sortOptions[0].value;
});