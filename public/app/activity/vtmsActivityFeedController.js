angular.module('vtms').controller('vtmsActivityFeedController', function($scope, vtmsActivity) {
  $scope.activityList = vtmsActivity.getRecentList();
  
  $scope.activityListConfig = {
    title: 'Activity Feed',
    actions: {
      delete: true,
      complete: false,
      deactivate: false
    },
    columns: {
      actions: true,
      teamMember: true,
      activity: true,
      startTime: true,
      endTime: true,
      duration: true
    },
    create: false,
    activityDetail: {
      series: true,
      lesson: true,
      task: true
    }
  };
  
});