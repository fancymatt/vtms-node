angular.module('vtms').controller('vtmsPublishingController', function($scope, vtmsPublishDate, vtmsPlatform, vtmsNotifier) {
  $scope.publishDates = vtmsPublishDate.getIncomplete();
  
  $scope.publishDatesConfig = {
    title: 'Publish Dates',
    actions: {
      deliver: true,
      delete: true
    },
    columns: {
      actions: true,
      series: true,
      number: true,
      title: true,
      platform: true,
      date: true,
      lessonStatus: true,
      status: true
    }
  };

  $scope.platforms = [
    {display: "Pod101 Site", tableValue: "pod101"},
    {display: "YouTube", tableValue: "YouTube"},
    {display: "Roku", tableValue: "roku"}
  ];
  
  $scope.selectedPlatform = $scope.platforms[0];
  
});