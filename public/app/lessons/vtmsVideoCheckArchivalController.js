angular.module('vtms').controller('vtmsVideoCheckArchivalController', function($scope, vtmsLesson) {
  
  $scope.videoCheckLessonsConfig = {
    title: 'Check These',
    type: 'videoCheckLessons',
    update: function() {
      return vtmsLesson.getVideoCheckLessons();
    },
    actions: {
      removeFromRenderQueue: false,
      markAsVideoChecked: true,
      markAsLanguageChecked: false,
      goToCheckingInterface: true,
    },
    columns: {
      actions: true,
      series: true,
      number: true,
      title: true,
      dueDate: true,
    }
  };
  
  $scope.archivableLessonsConfig = {
    title: 'Move These',
    type: 'archivableLessons',
    update: function() {
      return vtmsLesson.getArchivableLessons();
    },
    actions: {
      markAsArchived: true,
      goToCheckingInterface: true,
    },
    columns: {
      actions: true,
      series: true,
      number: true,
      title: true,
      dueDate: true,
    }
  };
  
});