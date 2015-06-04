angular.module('vtms').controller('vtmsMainController', function($scope, vtmsSeries, vtmsCachedSeries) {
  $scope.series = vtmsCachedSeries.query();
});