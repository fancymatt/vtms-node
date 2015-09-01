angular.module('vtms').controller('vtmsRenderQueueController', function($scope, vtmsLesson) {

  $scope.pageTitle = 'Render';

  $scope.lessonsToRenderConfig = {
    title: 'Lessons to Render',
    type: 'lessonsToRender',
    update: function() {
      return vtmsLesson.getReadyToRender();
    },
    actions: {
      addtoRenderQueue: true,
      removeFromRenderQueue: false,
      markAsExported: false,
      delete: false
    },
    columns: {
      actions: true,
      series: true,
      level: true,
      number: true,
      title: true,
      queuedTime: true,
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
    update: function() {
      return vtmsLesson.getQueued();
    },
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: true,
      markAsExported: true,
      delete: false
    },
    columns: {
      actions: true,
      series: true,
      level: true,
      number: true,
      title: true,
      lastRender: false,
      lastAction: false,
      queuedTime: true,
      qaLog: true,
      qaUrl: true,
      trt: false,
      dueDate: true,
      status: true
    }
  };

});
