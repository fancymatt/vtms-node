angular.module('vtms').directive('task', function() {
  return {
    limit: 'A',
    scope: true,
    templateUrl: '/partials/task/task',
    controller: function($scope) {
      
      $scope.activateTask = function(task) {
        task.activate().then(function(newData) {
          angular.extend(task, newData);
          $scope.activateTaskDelegate(task);
        });
      };

      $scope.completeTask = function(task) {
        task.complete().then(function(newData) {
          angular.extend(task, newData);
          $scope.completeTaskDelegate(task);
        });
      };

      $scope.deactivateTask = function(task) {
        task.deactivate().then(function(newData) {
          angular.extend(task, newData);
          $scope.deactivateTaskDelegate(task);
        });
      };
      
      $scope.markAsIncomplete = function(task) {
        task.incomplete().then(function(newData) {
          angular.extend(task, newData);
          $scope.incompleteTaskDelegate(task);
        });
      };
      
    }
  }
  
});