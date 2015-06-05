angular.module('vtms').controller('vtmsSeriesDetailController', function($scope, vtmsSeries, $routeParams) {
  $scope.series = vtmsSeries.get({id: $routeParams.id});
  
  $scope.sortOptions = [
    {value: "title", text: "Sort by Title"},
    {value: "language.name", text: "Sort by Language"}
  ];
});