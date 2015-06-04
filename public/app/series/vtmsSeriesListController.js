angular.module('vtms').controller('vtmsSeriesListController', function($scope, vtmsSeries, vtmsCachedSeries) {
  $scope.series = vtmsCachedSeries.query();
  
  $scope.sortOptions = [{value: "title", text: "Sort by Title"},
                        {value: "code", text: "Sort by Code"}];
  $scope.sortOrder = $scope.sortOptions[0].value;
});