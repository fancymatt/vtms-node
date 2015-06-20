angular.module('vtms').factory('vtmsAuth', function($http, vtmsIdentity, $q, vtmsUser, $location, vtmsNotifier) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username: username, password: password}).then(function(response) {
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
    
    createUser: function(newUserData) {
      var newUser = new vtmsUser(newUserData);
      var dfd = $q.defer();
      console.log("user created");
      
      newUser.$save().then(function() {
        console.log("user saved");
        vtmsIdentity.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      
      return dfd.promise;
    },
    
    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();
      var clone = angular.copy(vtmsIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        vtmsIdentity.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
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
    },
    
    authorizeCurrentUserForRoute: function(role) {
      if(vtmsIdentity.isAuthorized(role)) { 
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },
    
    authorizeAuthenticatedUserForRoute: function() {
      if(vtmsIdentity.isAuthenticated()) { 
        return true;
      } else {
        return $q.reject('not logged in');
      }
    },
    
    authorizeCurrentUserIsTeamMember: function() {
      var dfd = $q.defer();
      if(vtmsIdentity.isAuthenticated()) {
        if(vtmsIdentity.currentUser.fkTeamMember) {
          dfd.resolve(true);
        } else {
          dfd.reject('not a member.');
          $location.path('/');
          vtmsNotifier.error("The user you are logged in as is not associated with a team member.");
        }
      } else {
        dfd.reject('not logged in');
        $location.path('/');
        vtmsNotifier.error("You must be logged in to view a task list.");
      }
      return dfd.promise;
    }
  };
});