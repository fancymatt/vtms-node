angular.module('vtms').controller('vtmsPublishDateListController', function($scope, vtmsPublishDate, vtmsPlatform, vtmsNotifier) {
  $scope.publishDates = vtmsPublishDate.getIncomplete();
  
  $scope.platforms = [
    {display: "Pod101 Site", tableValue: "pod101"},
    {display: "YouTube", tableValue: "YouTube"},
    {display: "Roku", tableValue: "roku"}
  ];
  
  $scope.selectedPlatform = $scope.platforms[0];
  
  $scope.deliverPublishDate = function(publishDate) {
    publishDate.deliver().then(function(newData) {
      var indexToDelete = $scope.publishDates.indexOf(publishDate);
      $scope.publishDates.splice(indexToDelete, 1);
      
      var lessonString = publishDate.lesson.languageSery.title + " #" + publishDate.lesson.number;
      vtmsNotifier.notify("Delivered " + lessonString + " for " + publishDate.platform.name + ".");
    });
  };
});