angular.module('vtms').controller('vtmsSeriesListController', function($scope, vtmsSeries) {
  $scope.series = vtmsSeries.query();
  
  $scope.sortOptions = [{value: "title", text: "Sort by Title"},
                        {value: "code", text: "Sort by Code"}];
  $scope.sortOrder = $scope.sortOptions[0].value;
});