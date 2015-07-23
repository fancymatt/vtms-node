angular.module('vtms').controller('vtmsCheckingController', function($scope, vtmsLesson, vtmsIssue, $routeParams, vtmsNotifier) {
  var ctrl = this;
  ctrl.lessonId = $routeParams.id;
  ctrl.lesson = vtmsLesson.get({id: ctrl.lessonId});
});