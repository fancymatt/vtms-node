angular.module('vtms').controller('vtmsPublishingCompletedController', function($scope, vtmsPublishDate) {
  
  $scope.publishDatesConfig = {
    title: 'Ready to Publish',
    update: function() {
      return vtmsPublishDate.getSurrounding();
    },
    actions: {
      deliver: true,
      delete: true
    },
    filter: {
      deliveryStatus: false
    },
    columns: {
      actions: true,
      series: true,
      number: true,
      title: true,
      platform: true,
      date: true,
      status: true
    }
  };
  
});