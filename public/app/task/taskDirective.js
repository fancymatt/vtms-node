angular.module('vtms').directive('task', function(vtmsTask, vtmsLesson) {
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
        var lessonId = task.fkLesson
        task
          .complete()
          .then(function(newData) {
            angular.extend(task, newData);
            vtmsTask.getList({id: lessonId}, function(tasks) {
              $scope.completeTaskDelegate(task);
              vtmsLesson.get({id: lessonId}, function(lesson) {
                lesson.updateBenchmarks(tasks);
              });
            });
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