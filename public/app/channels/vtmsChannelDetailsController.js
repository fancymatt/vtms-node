angular.module('vtms').controller('vtmsChannelDetailsController', function($scope, vtmsChannel, vtmsPublishDate, $routeParams) {
  $scope.channelId = $routeParams.id;
  $scope.channel = vtmsChannel.get({id: $scope.channelId});

  $scope.upcomingPublishDateListConfig = {
    title: 'Upcoming Publish Dates',
    update: function() {
      return vtmsPublishDate.getUpcomingPublishDatesForChannel({id: $scope.channelId});
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
      platform: false,
      date: true,
      lessonStatus: true,
      status: true
    }
  };

});
