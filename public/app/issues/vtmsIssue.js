angular.module('vtms').factory('vtmsIssue', function($resource, $q) {
  var IssueResource = $resource('/api/issues/:id', {id: '@id'}, {
    update: {method:'PUT', isArray: false},
    getLastIssueForLesson: {method:'GET', url: '/api/lessons/:id/issues/last-completed', isArray: false},
    getListForLesson: {method:'GET', url: '/api/lessons/:id/issues', isArray:true},
    getUnassignedIssuesForLesson: {method: 'GET', url: '/api/lessons/:id/issues/unassigned', isArray: true},
    getIssuesForTask: {method:'GET', url: '/api/tasks/:id/issues', isArray:true}
  });

  IssueResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject('You don\'t have permission to edit.');
    });
    return dfd.promise;
  };

  IssueResource.prototype.delete = function() {
    var dfd = $q.defer();
    this.$delete().then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject('You don\'t have permission to delete.');
    });
    return dfd.promise;
  };

  IssueResource.prototype.complete = function() {
    var dfd = $q.defer();

    var finishTime = moment(Date.now()).utc();

    this.update({
      isCompleted: true,
      timeCompleted: finishTime.format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };

  return IssueResource;
});
