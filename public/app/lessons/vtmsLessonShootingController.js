angular.module('vtms').controller('vtmsLessonShootingController', function($scope, vtmsLesson, vtmsShot, $routeParams) {
  var ctrl = this;
  ctrl.lessonId = $routeParams.id;
  ctrl.lesson = vtmsLesson.get({id: ctrl.lessonId});

  ctrl.shotsConfig = {
    title: 'Teleprompter Script',
    sortable: true,
    shooting: true,
    lessonId: ctrl.lessonId,
    update: function() {
      return vtmsShot.getList({id: ctrl.lessonId});
    },
    actions: {},
    columns: {
      actions: true
    }
  };

});
