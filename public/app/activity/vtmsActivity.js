angular.module('vtms').factory('vtmsActivity', function($resource) {
  var ActivityResource = $resource('/api/activities/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false},
    getListForTeamMember: {method:'GET', url: '/api/teamMember/:id/activities', isArray: true},
    getListForLesson: {method:'GET', url: '/api/lessons/:id/activities' isArray: true},
    getActiveList: {method:'GET', url: '/api/activities/active', isArray: true},
    getRecentList: {method:'GET', url: '/api/activities/recent', isArray: true}
  });
  
  
  
  return ActivityResource;
});