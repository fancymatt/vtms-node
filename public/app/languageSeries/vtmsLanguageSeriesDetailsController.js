angular.module('vtms').controller('vtmsLanguageSeriesDetailController', function($scope, vtmsLanguageSeries, vtmsLesson, $routeParams, vtmsNotifier) {
  $scope.languageSeries = vtmsLanguageSeries.get({id: $routeParams.id});
  $scope.lessonList = vtmsLesson.getList({id: $routeParams.id});
  
  $scope.config = {
    
  };

});