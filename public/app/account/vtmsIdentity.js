angular.module('vtms').factory('vtmsIdentity', function($window, vtmsUser) {
  var currentUser;
  if(!!$window.bootstrappedUserObject) {
    currentUser = new vtmsUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.role === role;
    }
  }
});