angular.module('vtms').controller('vtmsSignupController', function($scope, vtmsAuth, vtmsUser, vtmsNotifier, $location) {
  
  $scope.signup = function() {
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    };
    
    vtmsAuth.createUser(newUserData).then(function() {
      vtmsNotifier.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      vtmsNotifier.error(reason);
    });
  };
  
});