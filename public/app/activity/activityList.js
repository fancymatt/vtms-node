angular.module('vtms').directive('activityList', function() {
  return {
    templateUrl: '/partials/activity/activity-list',
    restrict: 'E',
    scope: {
      activities: '=',
      config: '='
    },
    controller: function($scope, vtmsActivity) {
      $scope.activityList = $scope.activities;
    }
  };
});