angular.module('vtms').directive('activityList', function() {
  return {
    templateUrl: '/partials/activity/activity-list',
    restrict: 'E',
    scope: {
      config: '=',
      userId: '='
    },
    controller: function($scope, $rootScope, vtmsActivity, vtmsTask, vtmsNotifier) {
      
      $scope.refresh = function() {
        $scope.activityList = $scope.config.update();
      };
      
      $scope.refresh();
      
      
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
          console.log(list.length);
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
          console.log(list.length);
          return true;
        }
      };
      
      //TODO: Add Sort Options
      
      
      $scope.newActivityValues = {
        activity: '',
        fkTeamMember: $scope.userId,
        timeStart: ''
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
      
      function deleteFromList(item, list) {
        var index = list.indexOf(item);
        var itemToDelete = list[index];
        itemToDelete.delete().then(function() {
          list.splice(index, 1);
        });
      }
      
      var deactivateActiveActivitiesOnList = function() {
        for(var i = 0; i < $scope.activityList.length; i++) {
          if(!$scope.activityList[i].isCompleted) {
            $scope.deactivateActivity($scope.activityList[i]);
          }
        }
      };
      
      $scope.createActivity = function() {
        deactivateActiveActivitiesOnList();
        
        if($scope.newActivityValues.activity.length > 0) {
          var now = moment(Date.now());
          $scope.newActivityValues.timeStart = now.format('YYYY-MM-DD HH:mm:ss');
          $scope.newActivityValues.isActive = true;
          var newActivity = new vtmsActivity($scope.newActivityValues);
          newActivity.$save().then(function(activity) {
            $scope.activityList.push(activity);
            vtmsNotifier.notify('Began new activity: ' + $scope.newActivityValues.activity);
            $scope.newActivityValues.activity = '';
          });
        }
      };
      
      $scope.deleteActivity = function(activity) {
        deleteFromList(activity, $scope.activityList);
        vtmsNotifier.notify('Deleted an activity.');
      };

      $scope.completeActivity = function(activity) {
        activity.complete().then(function(newData) {
          if(activity.fkTask) {
            // It's either a Task or an Issue activity
            if(activity.activity === 'Fixing issues') {
              
            } else {
              vtmsTask.get({id: activity.fkTask}, function(task) {
                task.complete().then(function() {
                  $rootScope.$broadcast('task:completed', task);
                  $scope.refresh();
                });
              });
            }
          } else {
            $scope.refresh();
          }
          angular.extend(activity, newData);
        });
      };
      
      $scope.deactivateActivity = function(activity) {
        activity.deactivate().then(function(newData) {
          if(activity.fkTask) {
            // It's either a Task or an Issue activity
            if(activity.activity === 'Fixing issues') {
              
            } else {
              vtmsTask.get({id: activity.fkTask}, function(task) {
                task.deactivate().then(function() {
                  $scope.refresh();
                  $rootScope.$broadcast('task:deactivated', task);
                });
              });
            }
          } else {
            $scope.refresh();
          }
          angular.extend(activity, newData);
        });
      };
      
      
      $rootScope.$on('task:activated', function(event, task, activity) {
        $scope.refresh();
      });
      
      $rootScope.$on('activity:deactivated', function(event, activity) {
        $scope.refresh();
      });
      
      $rootScope.$on('activity:toBeAdded', function(event, activity) {
        // I don't like this, but we need a way to turn off activities when
        // created out of this scope
        deactivateActiveActivitiesOnList();
      });
      
      $rootScope.$on('activity:created', function(event, activity) {
        $scope.refresh();
      });
                     
    }
  };
});