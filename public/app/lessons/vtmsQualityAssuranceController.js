angular.module('vtms').controller('vtmsQualityAssuranceController', function($scope, vtmsLesson) {
  
  $scope.qaLessons = vtmsLesson.getQaLessons();
  
  $scope.qaLessonsConfig = {
    title: 'Lessons needing Language Check',
    type: 'languageCheckLessons',
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false,
      markAsVideoChecked: false,
      markAsLanguageChecked: true,
      markAsArchived: false,
      goToCheckingInterface: true,
      delete: false
    },
    columns: {
      actions: true,
      series: true,
      number: true,
      title: true,
      lastRender: false,
      lastAction: false,
      queuedTime: false,
      trt: false,
      dueDate: true,
      status: false
    }
  };
  
  $scope.refreshQaLessons = function() {
    return vtmsLesson.getQaLessons();
  };
  
});