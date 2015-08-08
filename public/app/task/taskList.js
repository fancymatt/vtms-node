angular.module('vtms').directive('taskList', function() {
  return {
    templateUrl: '/partials/task/task-list',
    restrict: 'E',
    scope: {
      lesson: '=',
      tasks: '=',
      config: '=',
      updateFn: '&'
    },
    controller: function($scope, $rootScope, vtmsTask, vtmsActivity, vtmsTeamMember, vtmsLesson, vtmsNotifier) {

      /**
       * Data Initialiazation
       */
      
      // Ensure that $scope.tasks is populated even if just the task was passed in
      if($scope.tasks) {
        // Just use those tasks
        $scope.taskList = $scope.tasks;
      } else {
        // We must be passing in the lesson, so get those tasks
        $scope.taskList = vtmsTask.getList({id: $scope.lesson.id});
      }
      
      // Grab any additional data that certain functionality requires
      $scope.eligibleTeamMembers = vtmsTeamMember.query();
      
      // TODO: Figure out how to offload this into a config option
      $scope.sortOption = 'dueDate()';
      
      /**
       * Private Functions
       */
      
      var findIdOnList = function(id, list) {
        for(var i = 0; i < list.length; i++) {
          if(id === list[i].id) {
            return i;
          }
        }
        return -1;
      };
      
      var removeFromList = function(item, list) {
        var indexToDelete = findIdOnList(item.id, list);
        if(indexToDelete > -1) {
          list.splice(indexToDelete, 1);
          return true;
        } else {
          return false;
        }
      };
      
      var extendItemOnList = function(item, list, object) {
        var indexFound = findIdOnList(item.id, list);
        if(indexFound > -1) {
          angular.extend(list[indexFound], object); 
          return true;
        } else {
          return false;
        }
      };

      var addToList = function(item, list) {
        if(findIdOnList(item.id, list) > -1) {
          return false;
        } else {
          list.push(item);
          return true;
        }
      };
      
      var checkLessonCompletionStatus = function(task) {
        // Get all tasks from that lesson and update benchmarks
        vtmsTask.getList({id: task.fkLesson}, function(tasks) {
          vtmsLesson.get({id: task.fkLesson}, function(lesson) {
            lesson.updateBenchmarks(tasks);
          });
        });
      };
      
      
      
      
      /**
       * Public Functions
       */
      
      $scope.refreshList = function() {
        $scope.taskList = $scope.updateFn();
      };
      
      $scope.activateTask = function(activatedTask) {
        
        // Will now end a custom activity when you create a new custom or activate a task
        // Will not end a task activity when you create a new activity
        // Will not display the ending of tasks dynamically
        
        
        vtmsActivity.getActiveActivityForTeamMember({id: activatedTask.fkTeamMember}, function(activeActivity) {
          
          if(activeActivity) {
            console.log('found an active activity');
            console.log('activeActivity', activeActivity);

            activeActivity.deactivate().then(function(deactivatedActivity) {
              $rootScope.$broadcast('activity:deactivated', deactivatedActivity);
              
              if(activeActivity.task > 0) {
                $rootScope.$broadcast('task:deactivated', activeActivity.task);
              }
            });
          }
        });
        
        activatedTask.activate().then(function(newData) {
          angular.extend(activatedTask, newData);
          var newActivity = new vtmsActivity();
          newActivity.createActivityForTask(activatedTask).then(function(createdActivity) {
            $rootScope.$broadcast('task:activated', activatedTask, createdActivity);
          });
        });
        
      };
      
      $scope.deactivateTask = function(deactivatedTask) {
        deactivatedTask.deactivate().then(function(newData) {
          angular.extend(deactivatedTask, newData);
          $rootScope.$broadcast('task:deactivated', deactivatedTask);
        });
      };
      
      $scope.completeTask = function(completedTask) {
        completedTask.complete().then(function(newData) {
          angular.extend(completedTask, newData);
          checkLessonCompletionStatus(completedTask);
          $rootScope.$broadcast('task:completed', completedTask);
        });
      };
      
      $scope.incompleteTask = function(incompletedTask) {
        incompletedTask.incomplete().then(function(newData) {
          angular.extend(incompletedTask, newData);
          $rootScope.$broadcast('task:incompleted', incompletedTask);
        });
      };
      
      $scope.assignTaskToTeamMember = function(task, teamMember) {
        task.update({fkTeamMember: teamMember.id}).then(function(newData) {
          $scope.refreshList();
          vtmsNotifier.notify('Assigned to ' + teamMember.nameFirst);
        });
      };

      
      /**
       * Listeners
       */
            
      $rootScope.$on('task:activated', function(event, task) {
        // No functionality
      });
            
      $rootScope.$on('task:deactivated', function(event, task) {
        if($scope.config.type === 'active') {
          removeFromList(task, $scope.taskList);
        }
        if($scope.config.type === 'actionable') {
          extendItemOnList(task, $scope.taskList, {isActive: false});
        }
      });
      
      $rootScope.$on('task:completed', function(event, task) {
        if($scope.config.type === 'actionable') {
          removeFromList(task, $scope.taskList);
        }
        if($scope.config.type === 'active') {
          removeFromList(task, $scope.taskList);
        }
      });
    }
  };
});