angular.module('vtms').factory('vtmsPublishDate', function($resource, $q) {
  var PublishDateResource = $resource('/api/publishDates/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false},
    getIncomplete: {method: 'GET', isArray:true, url:'/api/publishDates/incomplete'}
  });
  
  PublishDateResource.prototype.deliver = function() {
    var dfd = $q.defer();
    
    var startTime = moment(Date.now());
    
    this.$update({
      isDelivered: true,
      deliveredTime: startTime.format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  return PublishDateResource;
});