angular.module('vtms').service('vtmsTeamMember', function($http) {

  function handleSuccess(res) {
    return res.data.data;
  }

  function handleError(res) {
    return res.data;
  }

  this.query = function() {
    var promise = $http.get('/api/team-members')
      .then(handleSuccess, handleError);
    return promise;
  };

});
