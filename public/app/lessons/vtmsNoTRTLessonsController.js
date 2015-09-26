angular.module('vtms').controller('vtmsNoTRTLessonsController', function($scope, vtmsLesson) {

  $scope.lessonsConfig = {
    title: 'Lessons needing TRT',
    update: function() {
      return vtmsLesson.getNoTRTLessons();
    },
    sortable: true,
    sortOptions: {
      languageSeries: false,
      language: true,
      number: true,
      queuedTime: false,
      trt: false,
      qaLog: false,
      dueDate: false,
    },
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false,
      markAsVideoChecked: false,
      markAsLanguageChecked: false,
      markAsArchived: false,
      goToCheckingInterface: false,
      delete: false
    },
    columns: {
      actions: false,
      shortLesson: true,
      trt: false,
      trtEdit: true
    }
  };

});
