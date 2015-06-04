angular.module('vtms').factory('vtmsUser', function($resource) {
  var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
    update: {method:'PUT', isArray: false}
  });
  
  UserResource.prototype.isAdmin = function() {
    return this.role === 'admin';
  }
  
  return UserResource;
});