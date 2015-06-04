angular.module('vtms').factory('vtmsUser', function($resource) {
  var UserResource = $resource('/users/:id', {id: "@id"});
  
  UserResource.prototype.isAdmin = function() {
    return this.role === 'admin';
  }
  
  return UserResource;
});