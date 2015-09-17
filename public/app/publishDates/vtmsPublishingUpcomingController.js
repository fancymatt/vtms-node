angular.module('vtms').controller('vtmsPublishingUpcomingController', function($scope, vtmsPublishDate) {

  $scope.publishDatesConfig = {
    title: 'Upcoming Publish Dates',
    update: function() {
      return vtmsPublishDate.getUpcoming();
    },
    actions: {
      deliver: false,
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
      lessonStatus: true,
      status: false
    }
  };

});
