angular
  .module('vtms')
  .controller('vtmsSeriesListController', vtmsSeriesListController);

function vtmsSeriesListController(vtmsSeries) {
  var vm = this;

  vm.getSeries = getSeries;
  vm.series = [];
  vm.sortOptions = [{value: 'title', text: 'Sort by Title'}, {value: 'code', text: 'Sort by Code'}];
  vm.sortOrder = vm.sortOptions[0].value;
  vm.pageTitle = 'Series List';

  activate();

  function activate() {
    return getSeries().then(function() {
      console.log('Returned series data');
    });
  }

  function getSeries() {
    return vtmsSeries.query()
      .then(function(data) {
        vm.series = data;
        return vm.series;
      });
  }

}
