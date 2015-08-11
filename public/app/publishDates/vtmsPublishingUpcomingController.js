angular.module('vtms').controller('vtmsPublishingUpcomingController', function($scope, vtmsPublishDate) {
  
  $scope.publishDatesConfig = {
    title: 'Upcoming Publish Dates',
    update: function() {
      return vtmsPublishDate.getSurrounding();
    },
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