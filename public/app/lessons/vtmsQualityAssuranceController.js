angular.module('vtms').controller('vtmsQualityAssuranceController', function($scope, vtmsLesson) {
  
  $scope.qaLessons = vtmsLesson.getQaLessons();
  
  $scope.qaLessonsConfig = {
    title: 'Lessons needing Language Check',
    type: 'languageCheckLessons',
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
  
  $scope.refreshQaLessons = function() {
    return vtmsLesson.getQaLessons();
  };
  
  $scope.lessonsConfig = {
    title: 'Lessons',
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false,
      delete: true
    },
    columns: {
      actions: true,      
      series: false,
      number: true,
      title: true,
      lastRender: false,
      lastAction: false,
      queuedTime: false,
      trt: true,
      dueDate: true,
      status: true
    }
  };
  
});