angular.module('vtms').controller('vtmsUserListController', function($scope, vtmsUser) {
  $scope.users = vtmsUser.query();
});