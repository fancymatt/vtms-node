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
    
    thisLanguageSeries.update(newData).then(function() {
      var string = "Updated Language Series: ";
      for(var key in newData) {
        string += key + " changed to \"" + newData[key] + "\" ";
      }
      vtmsNotifier.notify(string);
    }, function(reason) {
      vtmsNotifier.error(reason);
    });
  };

});