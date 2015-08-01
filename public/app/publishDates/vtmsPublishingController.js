angular.module('vtms').controller('vtmsPublishingController', function($scope, vtmsPublishDate, vtmsPlatform, vtmsNotifier) {
  $scope.publishDates = vtmsPublishDate.getSurrounding();
  
  $scope.publishDatesConfig = {
    title: 'Publish Dates',
    actions: {
      deliver: true,
      delete: true,
      filter: true
    },
    columns: {
      actions: true,
      series: true,
      number: true,
      title: true,
      platform: true,
      date: true,
      lessonStatus: true,
      status: true
    }
  };

});