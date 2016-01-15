angular
  .module('vtms')
  .factory('vtmsSeries', vtmsSeries);

vtmsSeries.$inject = ['$http'];

function vtmsSeries($http) {
  var endpoint = '/api/series';
  var service = {
    getAll: getAll,
    getById: getById,
    getGlobalTasksForSeries: getGlobalTasksForSeries,
    getLanguageSeriesForSeries: getLanguageSeriesForSeries
  };
  return service;

  function getAll() {
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

  function getGlobalTasksForSeries(id) {
    return $http.get(endpoint + '/' + id + '/global-tasks')
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      return response.data.data;
    }

    function handleFailure(response) {
      console.log('Error');
    }
  }

  function getLanguageSeriesForSeries(id) {
    return $http.get(endpoint + '/' + id + '/language-series')
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
