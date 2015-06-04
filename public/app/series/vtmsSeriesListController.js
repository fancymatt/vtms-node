angular.module('vtms').controller('vtmsSeriesListController', function($scope, vtmsSeries) {
  $scope.series = vtmsSeries.query();
});