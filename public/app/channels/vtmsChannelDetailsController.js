angular.module('vtms').controller('vtmsChannelDetailsController', function($scope, vtmsChannel, $routeParams) {
  $scope.channelId = $routeParams.id;
  $scope.channel = vtmsChannel.get({id: $scope.channelId});

});
