angular.module('vtms').controller('vtmsPublishingReadyController', function($scope, vtmsPublishDate) {

  $scope.publishDatesConfig = {
    title: 'Ready to Publish',
    type: 'readyToPublish',
    update: function() {
      return vtmsPublishDate.getReadyToDeliverPublishDates();
    },
    actions: {
      deliver: true,
      delete: true
    },
    sortable: true,
    sortOptions: {
      date: true,
      platform: true
    },
    columns: {
      actions: true,
      shortLesson: true,
      platform: true,
      date: true,
      lessonStatus: false,
      status: false
    }
  };

});
