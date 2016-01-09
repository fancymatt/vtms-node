angular
  .module('vtms')
  .controller('vtmsSeriesListController', vtmsSeriesListController);

vtmsSeriesListController.$inject = ['vtmsSeries'];

function vtmsSeriesListController(vtmsSeries) {
  var vm = this;

  vm.getAllSeries = getAllSeries;
  vm.series = [];
  vm.sortOptions = [{value: 'title', text: 'Sort by Title'}, {value: 'code', text: 'Sort by Code'}];
  vm.sortOrder = vm.sortOptions[0].value;
  vm.pageTitle = 'Series List';

  activate();

  function activate() {
    return getAllSeries().then(function() {
      console.log('Returned series data');
    });
  }

  function getAllSeries() {
    return vtmsSeries.getAll()
      .then(function(data) {
        vm.series = data;
        return vm.series;
      });
  }

}
