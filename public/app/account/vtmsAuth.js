angular.module('vtms').factory('vtmsAuth', function($http, vtmsIdentity, $q) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          vtmsIdentity.currentUser = response.data.user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout: true}).then(function() {
        vtmsIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    }
  };
});