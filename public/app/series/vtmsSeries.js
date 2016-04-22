angular
  .module('vtms')
  .factory('vtmsSeries', vtmsSeries);

vtmsSeries.$inject = ['$http'];

function vtmsSeries($http) {
  var endpoint = '/api/series';
  var seriesList;
  var service = {
    getAll: getAll,
    getById: getById,
    getGlobalTasksForSeries: getGlobalTasksForSeries,
    getGlobalAssetsForSeries: getGlobalAssetsForSeries,
    getLanguageSeriesForSeries: getLanguageSeriesForSeries
  };
  return service;

  function getAll() {
    return $http.get(endpoint, {cache: true})
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      seriesList = response.data.data;
      return response.data.data;
    }

    function handleFailure(response) {
      console.log('Error');
    }
  }

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

  function getGlobalTasksForSeries(id) {
    return $http.get(endpoint + '/' + id + '/global-tasks', {cache: true})
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      return response.data.data;
    }

    function handleFailure(response) {
      console.log('Error');
    }
  }

  function getGlobalAssetsForSeries(id) {
    return $http.get(endpoint + '/' + id + '/global-assets', {cache: true})
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
    return $http.get(endpoint + '/' + id + '/language-series', {cache: true})
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
