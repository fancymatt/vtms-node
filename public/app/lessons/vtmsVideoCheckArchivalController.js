angular.module('vtms').controller('vtmsVideoCheckArchivalController', function($scope, vtmsLesson) {
  
  $scope.videoCheckLessons = vtmsLesson.getVideoCheckLessons();
  $scope.archivableLessons = vtmsLesson.getArchivableLessons();
  
  $scope.updateVideoCheckLessons = function() {
    return vtmsLesson.getVideoCheckLessons();
  }
   
  $scope.updateArchivableLessons = function() {
    return vtmsLesson.getArchivableLessons();
  }
  
  $scope.videoCheckLessonsConfig = {
    title: 'Check These',
    type: 'videoCheckLessons',
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false,
      markAsVideoChecked: true,
      markAsLanguageChecked: false,
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
  
  $scope.archivableLessonsConfig = {
    title: 'Move These',
    type: 'archivableLessons',
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false,
      markAsVideoChecked: false,
      markAsLanguageChecked: false,
      markAsArchived: true,
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
  
});