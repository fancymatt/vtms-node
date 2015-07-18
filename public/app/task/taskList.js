angular.module('vtms').directive('taskList', function() {
  return {
    templateUrl: "/partials/task/task-list",
    restrict: "E",
    scope: {
      tasks: '=',
      title: '@'
    },
    controller: function($scope, vtmsTask, vtmsNotifier) {
      $scope.searchText = "";
      
      $scope.sortOptions = [
        {value: "dueDate()", text: "Sort by Due Date"},
        {value: "taskGlobal.name", text: "Sort by Task Type"}
      ];
      
      $scope.selectedSortOption = $scope.sortOptions[0].value;
      
      var removeFromList = function(object, list) {
        list.splice(list.indexOf(object),1);
      };

      var addToList = function(object, list) {
        list.push(object);
      };

      $scope.activateTask = function(task) {
        task.activate().then(function(newData) {
          angular.extend(task, newData);
          if($scope.$parent.ctrl.actionableTasks) {
            addToList(task, $scope.$parent.ctrl.activeTasks);
            removeFromList(task, $scope.$parent.ctrl.actionableTasks);
          }
          vtmsNotifier.notify("Activated " + task.toString() + ".");
        });
      };

      $scope.completeTask = function(task) {
        task.complete().then(function(newData) {
          angular.extend(task, newData);
          if($scope.$parent.ctrl.actionableTasks) {
            removeFromList(task, $scope.$parent.ctrl.activeTasks);
          }
          var durationString = moment.duration(newData.timeRunning, 'seconds');
          var notification = "";
          notification += "Completed " + task.toString() + ".\n";
          notification += "It took " + durationString.humanize() + "."
          vtmsNotifier.success(notification);
        });
      };

      $scope.deactivateTask = function(task) {
        task.deactivate().then(function(newData) {
          angular.extend(task, newData);
          if($scope.$parent.ctrl.actionableTasks) {
            addToList(task, $scope.$parent.ctrl.actionableTasks);
            removeFromList(task, $scope.$parent.ctrl.activeTasks);
          }
          var durationString = moment.duration(newData.timeRunning, 'seconds');
          var notification = "";
          notification += "Deactivated " + task.toString() + ".\n";
          notification += "You've worked for " + durationString.humanize() + " so far."
          vtmsNotifier.notify(notification);
        });
      };
    }
  }
});