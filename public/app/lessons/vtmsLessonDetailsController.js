angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsShot, vtmsTask, vtmsIssue, $routeParams, vtmsNotifier, $window) {
  
  $scope.lesson = vtmsLesson.get({id: $routeParams.id});
  
  $scope.shotList = vtmsShot.getList({id: $routeParams.id});
  $scope.issuesList = vtmsIssue.getListForLesson({id: $routeParams.id});
  
  $scope.taskList = vtmsTask.getList({id: $routeParams.id});
  $scope.assetList = vtmsTask.getAssets({id: $routeParams.id});
  
  $scope.newShotValues = {
    shot: 1,
    script: "",
    type: ""
  };
  
  $scope.newIssueValues = {
    creator: "Checker", 
    fkTask: "",
    timecode: "", 
    body: ""
  };
  
  function deleteFromList(item, list) {
    var index = list.indexOf(item);
    var itemToDelete = list[index];
    itemToDelete.delete().then(function() {
      list.splice(index, 1);
    });
  }
  
  $scope.getNameFromTaskId = function(id, list) {
    for(var i = 0; i < list.length; i++) {
      if(list[i].id === id) return list[i].taskGlobal.name;
    }
    return false;
  };
  
  $scope.newShot = function() {
    $scope.newShotValues.fkLesson = $scope.lesson.id;
    var newShot = new vtmsShot($scope.newShotValues);
    newShot.$save().then(function(shot) {
      $scope.shotList[$scope.shotList.length] = shot;
    });
    
    $window.document.getElementById("newShot").focus();
    $scope.newShotValues = {
      shot: $scope.newShotValues.shot + 1,
      script: "",
      type: ""
    }
    vtmsNotifier.notify("Added new shot.");
  };
  
  $scope.newIssue = function() {
    var newIssue = new vtmsIssue($scope.newIssueValues);
    newIssue.$save().then(function(issue) {
      $scope.issuesList[$scope.issuesList.length] = issue;
    });
    
    $window.document.getElementById("newIssue").focus();
    $scope.newIssueValues = {
      creator: $scope.newIssueValues.creator,
      fkTask: $scope.newIssueValues.fkTask,
      timecode: "",
      body: ""
    }
    vtmsNotifier.notify("Added new issue.");
  };
  
  $scope.deleteShot = function(shot) {
    deleteFromList(shot, $scope.shotList);
    vtmsNotifier.notify("Deleted a shot.");
  };
  
  $scope.deleteIssue = function(issue) {
    deleteFromList(issue, $scope.issuesList);
    vtmsNotifier.notify("Deleted an issue.");
  };
  
}).directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});