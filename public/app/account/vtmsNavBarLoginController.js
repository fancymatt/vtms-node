angular.module('vtms').controller('vtmsNavBarLoginController', function($scope, $http, vtmsIdentity, vtmsNotifier, vtmsAuth) {
  $scope.identity = vtmsIdentity;
  $scope.signin = function(username, password) {
    vtmsAuth.authenticateUser(username, password).then(function(success) {
      if(success) {
        vtmsNotifier.notify('You have successfully signed in!');
      } else {
        vtmsNotifier.notify('The username or password was incorrect.');
      }
    });
  };
});