angular
  .module('vtms')
  .factory('vtmsLevel', vtmsLevel);

vtmsLevel.$inject = ['$http', 'vtmsNotifier'];

function vtmsLevel($http, vtmsNotifier) {
  var endpoint = '/api/levels';
  var service = {
    getById: getById,
    getAll: getAll
  };
  return service;

  function getById(id) {
    return $http.get(endpoint + '/' + id)
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      return response.data.data;
    }

    function handleFailure(response) {
      vtmsNotifier.error('Cannot get level: ' + response.data.error);
    }
  }

  function getAll() {
    return $http.get(endpoint)
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      return response.data.data;
    }

    function handleFailure(response) {
      vtmsNotifier.error('Cannot get level list: ' + response.data.error);
    }
  }
}
