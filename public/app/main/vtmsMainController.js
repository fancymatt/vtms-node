angular.module('vtms').controller('vtmsMainController', function($scope, vtmsSeries, vtmsCachedSeries) {
  var ctrl = this;
  ctrl.series = vtmsCachedSeries.query();
});