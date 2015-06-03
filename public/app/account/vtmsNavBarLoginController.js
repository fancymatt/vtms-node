angular.module('vtms').controller('vtmsNavBarLoginController', function($scope, $http, vtmsIdentity, vtmsNotifier) {
  $scope.identity = vtmsIdentity;
  $scope.signin = function(username, password) {
    $http.post('/login', {username:username, password:password}).then(function(response) {
      if(response.data.success) {
        vtmsIdentity.currentUser = response.data.user;
        vtmsNotifier.notify('You have successfully signed in!');
      } else {
        vtmsNotifier.notify('The username or password was incorrect.');
      }
    });
  };
});