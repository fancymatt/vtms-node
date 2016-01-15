angular
  .module('vtms')
  .factory('vtmsLanguageSeries', vtmsLanguageSeries);

vtmsLanguageSeries.$inject = ['$http'];

function vtmsLanguageSeries($http) {
  var endpoint = '/api/language-series';
  var service = {
    getById: getById,
    create: create
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
      console.log('Error');
    }
  }

  function create(body) {
    return $http.post(endpoint, body)
      .then(handleSuccess)
      .catch(handleFailure)

    function handleSuccess(response) {
      return response.data.data;
    }

    function handleFailure(response) {
      console.log({error: response.data.error});
    }
  }

}
