angular.module('vtms').controller('vtmsActivityFeedController', function($scope, vtmsActivity) {
  
  $scope.activityListConfig = {
    title: 'Activity Feed',
    create: false,
    sortable: false,
    update: function() {
      return vtmsActivity.getRecentList();
    },
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
    activityDetail: {
      series: true,
      lesson: true,
      task: true
    }
  };
  
});