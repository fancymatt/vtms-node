angular.module('vtms').factory('vtmsLanguageSeries', function($resource) {
  var LanguageSeriesResource = $resource('/api/languageSeries/:id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
  
  return LanguageSeriesResource;
});