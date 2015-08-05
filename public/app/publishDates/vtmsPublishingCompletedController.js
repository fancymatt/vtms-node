angular.module('vtms').controller('vtmsPublishingCompletedController', function($scope, vtmsPublishDate, vtmsPlatform, vtmsNotifier) {
  $scope.publishDates = vtmsPublishDate.getSurrounding();
  
  $scope.publishDatesConfig = {
    title: 'Ready to Publish',
    actions: {
      deliver: true,
      delete: true
    },
    filter: {
      platform: false,
      lessonStatus: false,
      deliveryStatus: false
    },
    columns: {
      actions: true,
      series: true,
      number: true,
      title: true,
      platform: true,
      date: true,
      lessonStatus: false,
      status: true
    }
  };

});