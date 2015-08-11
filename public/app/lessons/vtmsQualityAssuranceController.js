angular.module('vtms').controller('vtmsQualityAssuranceController', function($scope, vtmsLesson) {
  
  $scope.qaLessonsConfig = {
    title: 'Lessons needing Language Check',
    type: 'languageCheckLessons',
    update: function() {
      return vtmsLesson.getQaLessons();
    },
    sortable: true,
    sortOptions: {
      languageSeries: false,
      language: true,
      number: true,
      queuedTime: false,
      trt: false,
      qaLog: true,
      dueDate: true,
    },
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
      title: false,
      lastRender: false,
      lastAction: false,
      queuedTime: false,
      trt: false,
      qaLog: true,
      qaUrl: true,
      dueDate: true,
      status: false
    }
  };
  
});