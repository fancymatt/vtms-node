angular.module('vtms').directive('issuesList', function() {
  return {
    templateUrl: "/partials/issues/issues-list",
    restrict: "E",
    scope: {
      lesson: '=',
      title: '=',
      issues: '=',
      config: '=',
      currentTime: '='
    },
    controller: function($scope, $window, vtmsLesson, vtmsIssue, vtmsTask, vtmsNotifier, $filter) {
      
      /**
       * Data Initialization
       */
      
      // Ensure that $scope.issues is populated even if just the lesson was passed in
      if($scope.issues) {
        // just use those issues
        $scope.issuesList = $scope.issues;
      } else {
        // we must be passing in lesson, so get the issues for that lesson
        $scope.issuesList = vtmsIssue.getListForLesson({id: $scope.lesson.id}); 
      }
      
      // Grab any additional data that certain functionality requires
      if($scope.config.actions.reassign) {
        $scope.taskList = $scope.taskList = vtmsTask.getList({id: $scope.lesson.id});
      }
      
      
      /**
       * Private Functions
       */
      
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
      
      
      /**
       * Public Functions
       */
      
      $scope.getNameFromTaskId = function(id) {
        if($scope.taskList.length) {
          for(var i = 0; i < $scope.taskList.length; i++) {
            if($scope.taskList[i].id === id) return $scope.taskList[i].taskGlobal.name;
          }
          return "Unassigned";
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
            
      $scope.assignIssueToTask = function(theIssue, task) {
        var newData = {fkTask: task.id};
        vtmsIssue.get({id: theIssue.id}, function(issue) {
          issue.update(newData).then(function() {
            removeFromList(theIssue, $scope.issuesList);
          });
        });
        vtmsNotifier.notify("Assigned to " + task.taskGlobal.name);
      };
      
      $scope.completeIssue = function(theIssue) {
        vtmsIssue.get({id: theIssue.id}, function(issue) {
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
        });
      };
    }
  }
});