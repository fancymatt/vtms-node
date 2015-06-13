angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsShot, vtmsTask, $routeParams, vtmsNotifier) {
  
  $scope.lesson = vtmsLesson.get({id: $routeParams.id});
  $scope.shotList = vtmsShot.getList({id: $routeParams.id});
  $scope.taskList = vtmsTask.getList({id: $routeParams.id});
  
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