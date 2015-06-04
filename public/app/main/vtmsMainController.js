angular.module('vtms').controller('vtmsMainController', function($scope, vtmsSeries) {
  $scope.series = vtmsSeries.query();
});