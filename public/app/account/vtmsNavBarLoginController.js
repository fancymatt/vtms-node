angular.module('vtms').controller('vtmsNavBarLoginController', function($scope, $http) {
  $scope.signin = function(username, password) {
    $http.post('/login', {username:username, password:password}).then(function(response) {
      if(response.data.success) {
        console.log('logged in!');
      } else {
        console.log('log in failure');
      }
    });
  };
});