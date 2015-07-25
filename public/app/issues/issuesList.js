angular.module('vtms').directive('issuesList', function() {
  return {
    templateUrl: "/partials/issues/issues-list",
    restrict: "E",
    scope: {
      lesson: '=',
      issues: '=',
      friendly: '&',
      persistant: '&',
      currentTime: '='
    },
    controller: function($scope, $window, vtmsIssue, vtmsTask, vtmsNotifier, $filter) {
      if(!!$scope.lesson) {
        if(!!$scope.lesson.$promise) {
          $scope.lesson.$promise.then(function(lesson) {
            $scope.issuesList = vtmsIssue.getListForLesson({id: $scope.lesson.id});
          });
        } else {
          $scope.issuesList = vtmsIssue.getListForLesson({id: $scope.lesson.id});
        }
        if(!$scope.friendly) $scope.taskList = vtmsTask.getList({id: $scope.lesson.id});
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
      
      var removeFromList = function(object, list) {
        list.splice(list.indexOf(object),1);
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
        fkLesson: "",
        timecode: "",
        body: ""
      };
      
      $scope.newIssue = function() {
        $scope.newIssueValues.fkLesson = $scope.lesson.id;
        var newIssue = new vtmsIssue($scope.newIssueValues);
        newIssue.$save().then(function(issue) {
          $scope.issuesList[$scope.issuesList.length] = issue;
        });

        $window.document.getElementById("newIssue").focus();
        $scope.newIssueValues.timecode = "";
        $scope.newIssueValues.body = "";
      };
      
      $scope.getCurrentTime = function() {
        $scope.newIssueValues.timecode = $filter('videoTime')($scope.currentTime);
      };

      $scope.deleteIssue = function(issue) {
        deleteFromList(issue, $scope.issuesList);
        var notification = "You deleted an issue.";
      };
      
      $scope.completeIssue = function(issue) {
        issue.complete().then(function(newData) {
          if($scope.persistant) {
            angular.extend(issue, newData);
          } else {
            removeFromList(issue, $scope.issuesList);
          }
          var notification = "";
          notification += "You've completed the issue \"" + issue.body + "\"\n";
          vtmsNotifier.notify(notification);
        });
      };
    }
  }
});