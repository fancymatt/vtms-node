angular.module('vtms').controller('vtmsChannelListController', function($scope, vtmsChannel) {
  $scope.channels = vtmsChannel.query();
  /*
  $scope.sortOptions = [{value: "title", text: "Sort by Title"},
                        {value: "code", text: "Sort by Code"}];
  $scope.sortOrder = $scope.sortOptions[0].value;
  */
});
