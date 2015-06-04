angular.module('vtms').factory('vtmsCachedSeries', function(vtmsSeries) {
  var seriesList;
  
  return {
    query: function() {
      if(!seriesList) {
        seriesList = vtmsSeries.query();
      }
      
      return seriesList;
    }
  }
});