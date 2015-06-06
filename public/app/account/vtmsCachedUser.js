angular.module('vtms').factory('vtmsCachedUser', function(vtmsUser) {
  var user;
  
  return {
    query: function() {
      if(!user) {
        user = vtmsUser.query();
      }
      
      return user;
    }
  }
});