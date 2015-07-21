angular.module('vtms').controller('vtmsRenderQueueController', function($scope, vtmsLesson, vtmsNotifier) {
  
  $scope.lessonsToRender = vtmsLesson.getReadyToRender();
  
  $scope.lessonsInQueue = vtmsLesson.getQueued();
  
  $scope.addToQueue = function(lesson) {
    lesson.addToRenderQueue().then(function(newData) {
      angular.extend(lesson, newData);
      var indexToDelete = $scope.lessonsToRender.indexOf(lesson);
      $scope.lessonsToRender.splice(indexToDelete, 1);
      $scope.lessonsInQueue.push(lesson);
      
      var lessonString = lesson.languageSery.title + " #" + lesson.number + " - " + lesson.title;
      vtmsNotifier.notify("Added " + lessonString + " to the render queue.");
    })
  };
  
  $scope.removeFromQueue = function(lesson) {
    lesson.removeFromRenderQueue().then(function() {
      var indexToDelete = $scope.lessonsInQueue.indexOf(lesson);
      $scope.lessonsInQueue.splice(indexToDelete, 1);
      $scope.lessonsToRender.push(lesson);
      
      var lessonString = lesson.languageSery.title + " #" + lesson.number + " - " + lesson.title;
      vtmsNotifier.notify("Removed " + lessonString + " from the render queue.");
    })  
  };
  
  $scope.markAsExported = function(lesson) {
    lesson.markAsExported().then(function() {
      var indexToDelete = $scope.lessonsInQueue.indexOf(lesson);
      $scope.lessonsInQueue.splice(indexToDelete, 1);
      
      var lessonString = lesson.languageSery.title + " #" + lesson.number + " - " + lesson.title;
      vtmsNotifier.notify(lessonString + " has been successfully exported.");
    })    
  };
  
});