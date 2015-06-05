angular.module('vtms').controller('vtmsLanguageSeriesDetailController', function($scope, vtmsLanguageSeries, $routeParams) {
  $scope.languageSeries = vtmsLanguageSeries.get({id: $routeParams.id});
  
  $scope.sortOptions = [
    {value: "number", text: "Sort by Number"},
    {value: "trt", text: "Sort by Length"},
    {value: "title", text: "Sort by Title"}
  ];
  
  $scope.selectedSortOption = $scope.sortOptions[0].value;
  
});