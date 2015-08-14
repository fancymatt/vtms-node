angular.module('vtms').directive('taskList', function() {
  return {
    templateUrl: '/partials/task/task-list',
    restrict: 'E',
    scope: {
      config: '='
    },
    controller: function($scope, $rootScope, vtmsTask, vtmsActivity, vtmsTeamMember, vtmsLesson, vtmsNotifier) {

      /**
       * Data Initialiazation
       */
      
      $scope.refresh = function() {
        $scope.taskList = $scope.config.update();
      };
      
      $scope.refresh();
      
      // Grab any additional data that certain functionality requires
      $scope.eligibleTeamMembers = vtmsTeamMember.query();
      
      
      /**
       * Sorting
       */
      $scope.sortOptions = [];
      
      if($scope.config.sortOptions) {
        // Interpret config sort options
        if($scope.config.sortOptions.dueDate) { $scope.sortOptions.push({value: 'dueDate()', text: 'Sort by Due Date'}); }
        if($scope.config.sortOptions.status) { $scope.sortOptions.push({value: 'isCompleted', text: 'Sort by Status'}); }
        if($scope.config.sortOptions.language) {
          $scope.sortOptions.push({
            value: ['lesson.languageSery.language.name', 'lesson.languageSery.title', 'lesson.number'], 
            text: 'Sort by Language'
          });
        }
        $scope.selectedSortOption = $scope.sortOptions[0].value;
      } else {
        // Default sort values
        $scope.selectedSortOption = 'dueDate()';
      }


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
      
      var setAsMostRecentTask = function(task) {
        console.log("setAsMostRecentTask called");
        vtmsLesson.get({id: task.fkLesson}, function(lesson) {
          console.log(lesson);
          lesson.update({fkLastTask: task.id, lastTaskTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}).then(function(lesson) {
          });
        });
      };
  
      
      /**
       * Public Functions
       */

      
      $scope.activateTask = function(activatedTask) {
        
        // Will now end a custom activity when you create a new custom or activate a task
        // Will not end a task activity when you create a new activity
        // Will not display the ending of tasks dynamically
        
        
        vtmsActivity.getActiveActivityForTeamMember({id: activatedTask.fkTeamMember}, function(activeActivity) {
          
          if(activeActivity) {

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
          console.log("completeTask");
          console.log(completedTask);
          if(!completedTask.taskGlobal.isAsset) setAsMostRecentTask(completedTask);
          checkLessonCompletionStatus(completedTask);
          $rootScope.$broadcast('task:completed', completedTask);
        });
      };
      
      $scope.deliverTask = function(deliveredAsset) {
        deliveredAsset.deliver().then(function(newData) {
          angular.extend(deliveredAsset, newData);
          checkLessonCompletionStatus(deliveredAsset);
          $rootScope.$broadcast('task:delivered', deliveredAsset);
        });
      };
      
      $scope.incompleteTask = function(incompletedTask) {
        incompletedTask.incomplete().then(function(newData) {
          angular.extend(incompletedTask, newData);
          checkLessonCompletionStatus(incompletedTask);
          $rootScope.$broadcast('task:incompleted', incompletedTask);
        });
      };
      
      $scope.undeliverTask = function(undeliveredTask) {
        undeliveredTask.undeliver().then(function(newData) {
          angular.extend(undeliveredTask, newData);
          checkLessonCompletionStatus(undeliveredTask);
          $rootScope.$broadcast('task:undelivered', undeliveredTask);
        });
      };
      
      $scope.assignTaskToTeamMember = function(task, teamMember) {
        task.update({fkTeamMember: teamMember.id}).then(function(newData) {
          $scope.refresh();
          vtmsNotifier.notify('Assigned to ' + teamMember.nameFirst);
        });
      };

      
      /**
       * Listeners
       */
            
      $rootScope.$on('task:activated', function(event, task) {
        // No functionality
      });
      
      $rootScope.$on('task:delivered', function(event, task) {
        if($scope.config.type === 'undeliveredAssets') {
          removeFromList(task, $scope.taskList);
        }
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
        if($scope.config.type === 'undeliveredAssets') {
          if(task.taskGlobal.isAsset) {
            addToList(task, $scope.taskList);
            $scope.refresh();
          }
        }
        
      });
    }
  };
});