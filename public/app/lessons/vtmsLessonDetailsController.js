angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, $routeParams, vtmsNotifier) {
  
  var thisLesson = vtmsLesson.get({id: $routeParams.id}, function() {
    $scope.lesson = thisLesson;
  });
  
  $scope.update = function(newData) {

    angular.extend(thisLesson, newData);
    
    thisLesson.update(newData).then(function() {
      var string = "Updated Lesson Series: ";
      for(var key in newData) {
        string += key + " changed to \"" + newData[key] + "\" ";
      }
      vtmsNotifier.notify(string);
    }, function(reason) {
      vtmsNotifier.error(reason);
    });
  };

});