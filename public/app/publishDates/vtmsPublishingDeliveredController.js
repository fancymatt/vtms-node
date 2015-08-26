angular.module('vtms').controller('vtmsPublishingDeliveredController', function($scope, vtmsPublishDate) {

  $scope.publishDatesConfig = {
    title: 'Recently Delivered Lessons',
    update: function() {
      return vtmsPublishDate.getDelivered();
    },
    sortable: true,
    sortOptions: {
      platform: true,
      deliveredOn: true
    },
    columns: {
      actions: false,
      series: true,
      number: true,
      platform: true,
      date: true,
      deliveredOn: true
    }
  };

});
