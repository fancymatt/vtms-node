angular
  .module('vtms')
  .factory('vtmsSeries', vtmsSeries);

vtmsSeries.$inject = ['$http'];

function vtmsSeries($http) {
  var endpoint = '/api/series';
  var service = {
    query: query
  }
  return service;

  function query() {
    return $http.get(endpoint)
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      return response.data.data;
    }

    function handleFailure(response) {
      console.log('Error');
    }

  }

}
