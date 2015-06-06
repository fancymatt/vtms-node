angular.module('vtms').factory('vtmsTeamMember', function($resource, $q) {
  var TeamMemberResource = $resource('/api/teamMembers/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false}
  });
  
  TeamMemberResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  return TeamMemberResource;
});