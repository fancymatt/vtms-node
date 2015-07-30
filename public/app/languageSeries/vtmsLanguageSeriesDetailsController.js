angular.module('vtms').controller('vtmsLanguageSeriesDetailController', function($scope, vtmsLanguageSeries, vtmsLesson, $routeParams, vtmsNotifier) {
  $scope.languageSeries = vtmsLanguageSeries.get({id: $routeParams.id});
  $scope.lessonList = vtmsLesson.getList({id: $routeParams.id});
  
  $scope.config = {
    actions: {
      addToRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false
    },
    columns: {
      actions: false,
      number: true,
      title: true,
      trt: true,
      dueDate: true,
      status: true,
      lastRender: false,
      lastAction: false, // Data not stored by default
      queuedTime: false
    }
  };

});