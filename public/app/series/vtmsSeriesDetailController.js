angular.module('vtms').controller('vtmsSeriesDetailController', function($scope, vtmsSeries, vtmsLanguageSeries, $routeParams) {
  $scope.series = vtmsSeries.get({id: $routeParams.id});
  $scope.languageSeriesList = vtmsLanguageSeries.getList({id: $routeParams.id});

  $scope.sortOptions = [
    {value: ["title", "level.number"], text: "Sort by Title"},
    {value: ["language.name", "level.number"], text: "Sort by Language"}
  ];

  $scope.selectedSortOption = $scope.sortOptions[0].value;
});
