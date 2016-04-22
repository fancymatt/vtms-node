angular
  .module('vtms')
  .controller('lesson.script.controller', vtmsLessonScriptController);

vtmsLessonScriptController.$inject = ['vtmsLesson', 'vtmsShot', 'vtmsSeries', 'vtmsNotifier', '$routeParams'];

function vtmsLessonScriptController(vtmsLesson, vtmsShot, vtmsSeries, vtmsNotifier, $routeParams) {
  var vm = this;

  vm.lesson = {};
  vm.shots = [];
  vm.assets = [];
  vm.getNameFromTaskId = getNameFromTaskId;

  activate();

  function activate() {
    getLesson();
    getShots();
  }

  function getLesson() {
    return vtmsLesson.getById($routeParams.id).then(function(data) {
      vm.lesson = data;
      getAssets();
      return vm.lesson;
    });
  }

  function getShots() {
    return vtmsLesson.getShots($routeParams.id).then(function(data) {
      vm.shots = data;
      return vm.shots;
    });
  }

  function getAssets() {
    return vtmsLesson.getAssets($routeParams.id).then(function(data) {
      vm.assets = data;
      return vm.assets;
    });
  }

  function getNameFromTaskId(id) {
    if(vm.assets.length) {
      for(var i = 0; i < vm.assets.length; i++) {
        if(vm.assets[i].id === id) { return vm.assets[i].taskGlobal.name; }
      }
      return false;
    }
  }

}
