angular.module('vtms').factory('vtmsUser', function($resource) {
  var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
    update: {method:'PUT', isArray: false}
  });
  
  UserResource.prototype.isAdmin = function() {
    return this.role === 'admin';
  }
  
  UserResource.prototype.isManager = function() {
    return this.role === 'manager' || this.role === 'admin';
  }
  
  UserResource.prototype.isTeamMember = function() {
    return this.fkTeamMember > 0;
  }
  
  return UserResource;
});