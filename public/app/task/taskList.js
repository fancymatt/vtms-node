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
        console.log("Setting this task as most recent for the lesson...");
        vtmsLesson.get({id: task.fkLesson}, function(lesson) {
          lesson.update({fkLastTask: task.id, lastTaskTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}).then(function(lesson) {
          });
        });
      };


      /**
       * Public Functions
       */


      $scope.activateTask = function(task) {
        var newActivity = new vtmsActivity;
        newActivity.createActivityForTask(task);
        task.cleanAndActivate();
      };

      $scope.deactivateTask = function(task) {
        task.deactivate();
      };

      $scope.completeTask = function(completedTask) {
        completedTask.complete();
      };

      $scope.deliverTask = function(deliveredAsset) {
        deliveredAsset.deliver().then(function(newData) {
          checkLessonCompletionStatus(deliveredAsset);
        });
      };

      $scope.incompleteTask = function(incompletedTask) {
        incompletedTask.incomplete().then(function(newData) {
          checkLessonCompletionStatus(incompletedTask);
        });
      };

      $scope.undeliverTask = function(undeliveredTask) {
        undeliveredTask.undeliver().then(function(newData) {
          checkLessonCompletionStatus(undeliveredTask);
        });
      };

      $scope.assignTaskToTeamMember = function(task, teamMember) {
        task.update({fkTeamMember: teamMember.id}).then(function(newData) {
          vtmsNotifier.notify('Assigned to ' + teamMember.nameFirst);
        });
      };


      /**
       * Listeners
       *
       * The primary role of these listeners is to detect
       * when a change has been made on ANOTHER list
       * that appears on the same view which requires one
       * of the following actions:
       *  - extendItemOnList(item, list)
       *  - removeFromList(item, list)
       *  - addToList(item, list)
       *  - $scope.refresh()
       */

      $rootScope.$on('task:activated', function(event, task) {
        if($scope.config.type === 'actionable') {
          $scope.refresh();
        }
      });

      $rootScope.$on('task:delivered', function(event, task) {
        if($scope.config.type === 'undeliveredAssets') {
          removeFromList(task, $scope.taskList);
        }
      });

      $rootScope.$on('task:deactivated', function(event, task) {
        if($scope.config.type === 'actionable') {
          $scope.refresh();
        }
      });

      $rootScope.$on('task:completed', function(event, task) {
        checkLessonCompletionStatus(task);
        if(!task.taskGlobal.isAsset) setAsMostRecentTask(task);
        $scope.refresh();
      });
    }
  };
});
