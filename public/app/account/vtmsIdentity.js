angular.module('vtms').factory('vtmsIdentity', function() {
  return {
    currentUser: undefined,
    isAuthenticated: function() {
      return !!this.currentUser;
    }
  }
});