angular.module('vtms').directive('issuesList', function() {
  return {
    templateUrl: "/partials/issues/issues-list",
    restrict: "E",
    scope: {
      lesson: '=',
      issues: '='
    },
    controller: function($scope, $window, vtmsIssue, vtmsTask, vtmsNotifier) {     
      if(!!$scope.lesson) {
        $scope.lesson.$promise.then(function(lesson) {
          $scope.issuesList = vtmsIssue.getListForLesson({id: $scope.lesson.id});
          $scope.taskList = vtmsTask.getList({id: $scope.lesson.id});
        });
      } else {
        $scope.issuesList = $scope.issues;
      }
      
      function deleteFromList(item, list) {
        var index = list.indexOf(item);
        var itemToDelete = list[index];
        itemToDelete.delete().then(function() {
          list.splice(index, 1);
        });
      };
      
      $scope.getNameFromTaskId = function(id) {
        if($scope.taskList.length) {
          for(var i = 0; i < $scope.taskList.length; i++) {
            if($scope.taskList[i].id === id) return $scope.taskList[i].taskGlobal.name;
          }
          return false;
        }
      };
      
      $scope.newIssueValues = {
        creator: "Checker", 
        fkTask: "",
        timecode: "", 
        body: ""
      };
      
      $scope.newIssue = function() {
        var newIssue = new vtmsIssue($scope.newIssueValues);
        newIssue.$save().then(function(issue) {
          $scope.issuesList[$scope.issuesList.length] = issue;
        });

        $window.document.getElementById("newIssue").focus();
        newIssueValues = {
          creator: $scope.newIssueValues.creator,
          fkTask: $scope.newIssueValues.fkTask,
          timecode: "",
          body: ""
        }
        vtmsNotifier.notify("Added new issue.");
      };

      $scope.deleteIssue = function(issue) {
        deleteFromList(issue, $scope.issuesList);
        vtmsNotifier.notify("Deleted an issue.");
      };
    }
  }
});