angular.module('vtms').factory('vtmsIssue', function($resource, $q) {
  var IssueResource = $resource('/api/issues/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false},
    getListForLesson: {method:'GET', url: '/api/lessons/:id/issues', isArray:true},
    getIssuesForTeamMember: {method:'GET', url: '/api/teamMember/:id/issues', isArray:true}
  });
  
  IssueResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to edit.");
    });
    return dfd.promise;
  };
  
  IssueResource.prototype.delete = function() {
    var dfd = $q.defer();
    this.$delete().then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to delete.");
    });
    return dfd.promise;
  };
  
  return IssueResource;
});
  