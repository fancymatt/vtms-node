angular
  .module('vtms')
  .factory('vtmsLanguage', vtmsLanguageSeries);

vtmsLanguageSeries.$inject = ['$http', 'vtmsNotifier'];

function vtmsLanguageSeries($http, vtmsNotifier) {
  var endpoint = '/api/languages';
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
      vtmsNotifier.error('Cannot get language: ' + response.data.error);
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
      vtmsNotifier.error('Cannot get language list: ' + response.data.error);
    }
  }
}
