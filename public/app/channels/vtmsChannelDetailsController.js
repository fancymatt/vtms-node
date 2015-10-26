angular.module('vtms').controller('vtmsChannelDetailsController', function($scope, vtmsChannel, vtmsPublishDate, $routeParams) {
  $scope.channelId = $routeParams.id;
  $scope.channel = vtmsChannel.get({id: $scope.channelId});

  $scope.upcomingPublishDateListConfig = {
    title: 'YouTube Publishing Schedule',
    update: function() {
      return vtmsPublishDate.getUpcomingPublishDatesForChannel({id: $scope.channelId});
    },
    actions: {
      deliver: true,
      delete: true
      //undeliver: true
    },
    sortable: true,
    sortOptions: {
      date: true,
      languageSeries: true
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
