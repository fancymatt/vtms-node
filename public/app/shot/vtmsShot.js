angular
  .module('vtms')
  .factory('vtmsShot', vtmsShot);

vtmsShot.$inject = ['$http', 'vtmsNotifier'];

function vtmsShot($http, vtmsNotifier) {
  var endpoint = 'api/shots';
  var service = {

  };
  return service;

  function getById(id) {
    return $http.get(endpoint + '/' + id, {cache: true})
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
