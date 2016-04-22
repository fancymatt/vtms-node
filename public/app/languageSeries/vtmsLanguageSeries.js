angular
  .module('vtms')
  .factory('vtmsLanguageSeries', vtmsLanguageSeries);

vtmsLanguageSeries.$inject = ['$http', 'vtmsNotifier'];

function vtmsLanguageSeries($http, vtmsNotifier) {
  var endpoint = '/api/language-series';
  var service = {
    getById: getById,
    create: create,
    getLessons: getLessons,
    getSeries: getSeries
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

  function getLessons(languageSeriesId) {
    return $http.get(endpoint + '/' + languageSeriesId + '/' + 'lessons', {cache: true})
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      return response.data;
    }

    function handleFailure(response) {
      vtmsNotifier.error('Cannot retrieve lesson list: ' + response.data.error);
    }
  }

  function getSeries(languageSeriesId) {
    return $http.get(endpoint + '/' + languageSeriesId + '/' + 'series', {cache: true})
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      return response.data;
    }

    function handleFailure(response) {
      vtmsNotifier.error('Cannot series for language series: ' + response.data.error);
    }
  }

  function create(body) {
    return $http.post(endpoint, body)
      .then(handleSuccess)
      .catch(handleFailure);

    function handleSuccess(response) {
      vtmsNotifier.notify('Created new language series: ' + response.data.data.title);
      return response.data.data;
    }

    function handleFailure(response) {
      vtmsNotifier.error('Cannot create language series: ' + response.data.error);
    }
  }

}
