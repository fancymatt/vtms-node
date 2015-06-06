angular.module('vtms').controller('vtmsLanguageSeriesDetailController', function($scope, vtmsLanguageSeries, $routeParams, vtmsNotifier) {
  
  $scope.sortOptions = [
    {value: "number", text: "Sort by Number"},
    {value: "trt", text: "Sort by Length"},
    {value: "title", text: "Sort by Title"}
  ];
  
  $scope.selectedSortOption = $scope.sortOptions[0].value;
  
  var thisLanguageSeries = vtmsLanguageSeries.get({id: $routeParams.id}, function() {
    $scope.languageSeries = thisLanguageSeries;
  });
  
  $scope.update = function(newData) {

    angular.extend(thisLanguageSeries, newData);
    
    thisLanguageSeries.update().then(function() {
      vtmsNotifier.notify('This Language Series has been updated');
    }, function(reason) {
      vtmsNotifier.error(reason);
    });
  };

});