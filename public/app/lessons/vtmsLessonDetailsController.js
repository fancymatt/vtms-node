angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsTask, $routeParams) {
  var ctrl = this;
  ctrl.lessonId = $routeParams.id;
  ctrl.lesson = vtmsLesson.get({id: ctrl.lessonId});
  ctrl.taskList = vtmsTask.getList({id: ctrl.lessonId});
});