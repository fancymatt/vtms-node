angular.module('vtms').factory('vtmsAuth', function($http, vtmsIdentity, $q, vtmsUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new vtmsUser();
          angular.extend(user, response.data.user);
          vtmsIdentity.currentUser = user;
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