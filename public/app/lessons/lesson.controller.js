angular
  .module('vtms')
  .controller('vtmsLessonDetailsController', vtmsLessonDetailsController);

vtmsLessonDetailsController.$inject = ['vtmsLesson', 'vtmsIdentity', 'vtmsNotifier', '$routeParams'];

function vtmsLessonDetailsController(vtmsLesson, vtmsIdentity, vtmsNotifier, $routeParams) {
  var vm = this;

  vm.lesson = {};
  vm.tasks = [];
  vm.assets = [];
  vm.issues = [];
  vm.publishDates = [];
  vm.activities = [];
  vm.toggleLanguageChecked = toggleLanguageChecked;
  vm.toggleVideoChecked = toggleVideoChecked;

  activate();

  function activate() {
    getLesson();
    getTasks();
    getAssets();
    getIssues();
    getPublishDates();
    getActivities();
  }

  function getLesson() {
    return vtmsLesson.getById($routeParams.id).then(function(data) {
      vm.lesson = data;
      return vm.lesson;
    });
  }

  function getAssets() {
    return vtmsLesson.getAssets($routeParams.id).then(function(data) {
      vm.assets = data;
      return vm.assets;
    });
  }

  function getTasks() {
    return vtmsLesson.getTasks($routeParams.id).then(function(data) {
      vm.tasks = data;
      return vm.tasks;
    });
  }

  function getIssues() {
    return vtmsLesson.getIssues($routeParams.id).then(function(data) {
      vm.issues = data;
      return vm.issues;
    });
  }

  function getPublishDates() {
    return vtmsLesson.getPublishDates($routeParams.id).then(function(data) {
      vm.publishDates = data;
      return vm.publishDates;
    });
  }

  function getActivities() {
    return vtmsLesson.getActivities($routeParams.id).then(function(data) {
      vm.activities = data;
      return vm.activities;
    });
  }

  function toggleLanguageChecked() {
    var valueToSet = !vm.lesson.checkedLanguage;
    return vtmsLesson.update($routeParams.id, {checkedLanguage: valueToSet}).then(function(data) {
      vm.lesson.checkedLanguage = valueToSet;
      return vm.lesson;
    });
  }

  function toggleVideoChecked() {
    var valueToSet = !vm.lesson.checkedVideo;
    return vtmsLesson.update($routeParams.id, {checkedVideo: valueToSet}).then(function(data) {
      vm.lesson.checkedVideo = valueToSet;
      return vm.lesson;
    });
  }
}
