angular.module('vtms').factory('vtmsShot', function($resource, $q) {
  var ShotResource = $resource('/api/shots/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false},
    getList: {method:'GET', url: '/api/lessons/:id/shots', isArray:true}
  });
  
  ShotResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to edit.");
    });
    return dfd.promise;
  };
  
  ShotResource.prototype.delete = function() {
    var dfd = $q.defer();
    this.$delete().then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to delete.");
    });
    return dfd.promise;
  };
  
  return ShotResource;
});
  