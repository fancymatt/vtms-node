angular.module('vtms').controller('vtmsRenderQueueController', function($scope, vtmsLesson, vtmsNotifier) {
  
  $scope.lessonsToRender = vtmsLesson.getReadyToRender();
  
  $scope.lessonsInQueue = vtmsLesson.getQueued();
  
  $scope.lessonsToRenderConfig = {
    title: 'Lessons to Render',
    type: 'lessonsToRender',
    actions: {
      addtoRenderQueue: true,
      removeFromRenderQueue: false,
      markAsExported: false,
      delete: false
    },
    columns: {
      actions: true,      
      series: true,
      number: true,
      title: false,
      lastRender: true,
      lastAction: true,
      queuedTime: true,
      trt: false,
      dueDate: true,
      status: true
    }
  };
  
  $scope.lessonsInQueueConfig = {
    title: 'Lessons in Queue',
    type: 'renderQueue',
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: true,
      markAsExported: true,
      delete: false
    },
    columns: {
      actions: true,      
      series: true,
      number: true,
      title: false,
      lastRender: false,
      lastAction: false,
      queuedTime: true,
      trt: false,
      dueDate: true,
      status: true
    }
  };

});