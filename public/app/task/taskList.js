angular.module('vtms').directive('taskList', function() {
  return {
    templateUrl: "/partials/task/task-list",
    restrict: "E",
    scope: {
      title: '@',
      tasks: '='
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
      
      $scope.activateTaskDelegate = function(task) {
        if($scope.$parent.ctrl.actionableTasks) {
          removeFromList(task, $scope.$parent.ctrl.actionableTasks);
        }
        if($scope.$parent.ctrl.activeTasks) {
          addToList(task, $scope.$parent.ctrl.activeTasks);
        }
        vtmsNotifier.notify("Activated " + task.toString() + ".");
      };
      
      $scope.deactivateTaskDelegate = function(task) {
        if($scope.$parent.ctrl.activeTasks) {
          removeFromList(task, $scope.$parent.ctrl.activeTasks);
        }
        if($scope.$parent.ctrl.actionableTasks) {
          addToList(task, $scope.$parent.ctrl.actionableTasks);
        }
        var durationString = moment.duration(task.timeRunning, 'seconds');
        var notification = "";
        notification += "Deactivated " + task.toString() + ".\n";
        notification += "You've worked for " + durationString.humanize() + " so far."
        vtmsNotifier.notify(notification);
      };
      
      $scope.completeTaskDelegate = function(task) {
        if($scope.$parent.ctrl.activeTasks) {
          removeFromList(task, $scope.$parent.ctrl.activeTasks);
        }
        var durationString = moment.duration(task.timeRunning, 'seconds');
        var notification = "";
        notification += "Completed " + task.toString() + ".\n";
        notification += "It took " + durationString.humanize() + "."
        vtmsNotifier.success(notification);
      };
      
      $scope.incompleteTaskDelegate = function(task) {
        if($scope.$parent.ctrl.actionableTasks) {
          addToList(task, $scope.$parent.ctrl.actionableTasks);
        }
        var notification = "You've marked " + task.toString() + " as incomplete";
        vtmsNotifier.notify(notification);
      };
    }
  }
});