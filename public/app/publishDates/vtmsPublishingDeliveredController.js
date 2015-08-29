angular.module('vtms').controller('vtmsPublishingDeliveredController', function($scope, vtmsPublishDate) {

  $scope.publishDatesConfig = {
    title: 'Recently Published Lessons',
    update: function() {
      return vtmsPublishDate.getDelivered();
    },
    sortable: true,
    sortOptions: {
      deliveredOnPlatform: true,
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
