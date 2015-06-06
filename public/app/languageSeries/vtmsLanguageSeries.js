angular.module('vtms').factory('vtmsLanguageSeries', function($resource, $q) {
  var LanguageSeriesResource = $resource('/api/languageSeries/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false}
  });
  
  LanguageSeriesResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  return LanguageSeriesResource;
});