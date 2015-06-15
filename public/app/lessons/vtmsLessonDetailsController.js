angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsShot, vtmsTask, $routeParams, vtmsNotifier, $window) {
  
  $scope.lesson = vtmsLesson.get({id: $routeParams.id});
  
  $scope.shotList = vtmsShot.getList({id: $routeParams.id});
  $scope.newShotValues;
  $scope.taskList = vtmsTask.getList({id: $routeParams.id});
  
  function resetNewShotValues() {
    $scope.newShotValues.shot = "";
    $scope.newShotValues.script = "";
    $scope.newShotValues.scriptEnglish =  "";
  };
  
  $scope.newShot = function() {
    $scope.newShotValues.fkLesson = $scope.lesson.id;
    var newShot = new vtmsShot($scope.newShotValues);
    newShot.$save().then(function(shot) {
      $scope.shotList[$scope.shotList.length] = shot;
    });
        
    $window.document.getElementById("newShot").focus();
    
    resetNewShotValues();
    vtmsNotifier.notify("Added new shot.");
  }
  
  $scope.deleteShot = function(shot) {
    var indexToDelete = $scope.shotList.indexOf(shot);
    console.log("item at " + indexToDelete + " will be deleted");
    var shotToDelete = $scope.shotList[indexToDelete];
    console.log(shotToDelete);
    shotToDelete.$delete();
    $scope.shotList.splice(indexToDelete, 1);
    vtmsNotifier.notify("Deleted a shot.");
  }
});