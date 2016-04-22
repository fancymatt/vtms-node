angular
  .module('vtms')
  .controller('vtmsSeriesDetailController', vtmsSeriesDetailController);

vtmsSeriesDetailController.$inject = ['$routeParams', 'vtmsIdentity', 'vtmsSeries', 'vtmsLanguage', 'vtmsLanguageSeries', 'vtmsLevel', 'vtmsNotifier'];

function vtmsSeriesDetailController($routeParams, vtmsIdentity, vtmsSeries, vtmsLanguage, vtmsLanguageSeries, vtmsLevel, vtmsNotifier) {
  var vm = this;

  vm.createLanguageSeries = createLanguageSeries;
  vm.globalTasksList = [];
  vm.identity = vtmsIdentity.currentUser;
  vm.languageSeriesList = [];
  vm.newLanguageSeriesLanguage = undefined;
  vm.newLanguageSeriesLevel = undefined;
  vm.newLanguageSeriesCount = undefined;
  vm.newLanguageSeriesTitle = undefined;
  vm.newLanguageSeriesPossibleLanguages = [{id: 1, name: 'Arabic'}, {id: 2, name: 'Bulgarian'}];
  vm.newLanguageSeriesPossibleLevels = [{id: 8, name: 'Intro'}, {id: 1, name: 'Absolute Beginner'}];
  vm.newLanguageSeriesPossibleLessons = [0, 5, 10, 12, 13, 15, 20, 25, 50, 100];
  vm.pageTitle = 'Series Detail';
  vm.series = {};
  vm.sortOptions = [{value: ['title', 'level.number'], text: 'Sort by Title'}, {value: ['language.name', 'level.number'], text: 'Sort by Language'}];
  vm.sortOrder = vm.sortOptions[0].value;

  activate();

  function activate() {
    getSeries();
    getLanguageSeriesList();
    getLanguageList();
    getLevelList();
  }

  function getSeries() {
    return vtmsSeries.getById($routeParams.id)
      .then(function(data) {
        vm.series = data;
        return vm.series;
      });
  }

  function getGlobalTasks() {
    return vtmsSeries.getGlobalTasksForSeries($routeParams.id)
      .then(function(data) {
        vm.globalTasksList = data;
        return vm.globalTasksList;
      });
  }

  function getLanguageSeriesList() {
    return vtmsSeries.getLanguageSeriesForSeries($routeParams.id)
      .then(function(data) {
        vm.languageSeriesList = data;
        return vm.languageSeriesList;
      });
  }

  function getLanguageList() {
    return vtmsLanguage.getAll()
      .then(function(data) {
        vm.newLanguageSeriesPossibleLanguages = data;
        return vm.newLanguageSeriesPossibleLanguages;
      });
  }

  function getLevelList() {
    return vtmsLevel.getAll()
      .then(function(data) {
        vm.newLanguageSeriesPossibleLevels = data;
        return vm.newLanguageSeriesPossibleLevels;
      });
  }

  function createLanguageSeries() {
    return vtmsLanguageSeries.create({
      fkLanguage: vm.newLanguageSeriesLanguage,
      fkLevel: vm.newLanguageSeriesLevel,
      fkSeries: vm.series.id,
      title: vm.newLanguageSeriesTitle,
      count: vm.newLanguageSeriesCount
    })
      .then(function(data) {
        if(data) {
          vm.newLanguageSeriesLanguage = undefined;
          vm.newLanguageSeriesLevel = undefined;
          vm.newLanguageSeriesCount = undefined;
          vm.newLanguageSeriesTitle = undefined;
          return activate();
        }
      });
  }
}
