angular.module('vtms').factory('vtmsLanguage', function($resource, $q) {
  var LanguageResource = $resource('/api/languages/:id', {id: "@id"}, {
  });

  return LanguageResource;
});
