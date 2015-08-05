angular.module('vtms').controller('vtmsPublishingUpcomingController', function($scope, vtmsPublishDate, vtmsPlatform, vtmsNotifier) {
  $scope.publishDates = vtmsPublishDate.getSurrounding();
  
  $scope.publishDatesConfig = {
    title: 'Upcoming Publish Dates',
    actions: {
      deliver: false,
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
      lessonStatus: true,
      status: false
    }
  };

});