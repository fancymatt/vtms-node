angular.module('vtms').controller('vtmsRenderQueueController', function($scope, vtmsLesson, vtmsNotifier) {
  var ctrl = this;
  
  ctrl.lessonsToRender = vtmsLesson.getReadyToRender();
  ctrl.lessonsInQueue = vtmsLesson.getQueued();
  
  ctrl.lessonsToRenderConfig = {
    type: 'renderQueuePending',
    title: 'Ready to Render',
    actions: {
      addToRenderQueue: true,
      removeFromRenderQueue: false,
      markAsExported: false
    },
    columns: {
      actions: true,
      number: false,
      title: true,
      trt: false,
      dueDate: true,
      status: true,
      lastRender: true,
      lastAction: true, // Data not stored by default
      queuedTime: false
    }
  };
  
  ctrl.lessonsInQueueConfig = {
    type: 'renderQueue',
    title: 'Render Queue',
    actions: {
      addToRenderQueue: false,
      removeFromRenderQueue: true,
      markAsExported: true
    },
    columns: {
      actions: true,
      number: false,
      title: true,
      trt: false,
      dueDate: true,
      status: true,
      lastRender: false,
      lastAction: false, // Data not stored by default
      queuedTime: true
    }
  };
  
});