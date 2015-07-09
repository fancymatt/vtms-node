angular.module('vtms').controller('vtmsPublishDateListController', function($scope, vtmsPublishDate, vtmsPlatform) {
  $scope.publishDates = vtmsPublishDate.getIncomplete();
});