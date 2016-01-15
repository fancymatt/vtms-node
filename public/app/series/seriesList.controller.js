angular
  .module('vtms')
  .controller('vtmsSeriesListController', vtmsSeriesListController);

vtmsSeriesListController.$inject = ['vtmsSeries'];

function vtmsSeriesListController(vtmsSeries) {
  var vm = this;

  vm.getSeriesList = getSeriesList;
  vm.seriesList = [];
  vm.sortOptions = [{value: 'title', text: 'Sort by Title'}, {value: 'code', text: 'Sort by Code'}];
  vm.sortOrder = vm.sortOptions[0].value;
  vm.pageTitle = 'Series List';

  activate();

  function activate() {
    return getSeriesList().then(function() {
      console.log('Returned series data');
    });
  }

  function getSeriesList() {
    return vtmsSeries.getAll()
      .then(function(data) {
        vm.seriesList = data;
        return vm.seriesList;
      });
  }

}
