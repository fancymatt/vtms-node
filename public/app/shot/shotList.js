angular.module('vtms').directive('shotList', function() {
  return {
    templateUrl: '/partials/shot/shot-list',
    restrict: 'E',
    scope: {
      config: '='
    },
    controller: function($scope, $window, vtmsShot, vtmsLesson, vtmsTask, vtmsNotifier, vtmsIdentity, vtmsList) {

      $scope.refresh = function() {
        $scope.shotList = $scope.config.update();
      };

      var sortOptions = [
        {key: 'chronological', value: ['section', 'shot'], display: 'Sort Chronologically'},
        {key: 'section', value: 'section', display: 'Sort by Section'},
        {key: 'shot', value: 'shot', display: 'Sort by Shot'},
        {key: 'type', value: 'type', display: 'Sort by Type'},
        {key: 'script', value: 'script', display: 'Sort by Script'},
        {key: 'asset', value: 'asset', display: 'Sort by Asset'}
      ];

      var initializeSortOptions = function(sortOptionsConfig) {
        $scope.sortOptions = [];

        // If sort option is set in config, add object to sortOptions array
        if(sortOptionsConfig) {
          sortOptions.forEach(function(sortOption) {
            if(sortOption.key in sortOptionsConfig) { $scope.sortOptions.push(sortOption); }
          });
        } else {
          // By default, use the top option in sortOptions array
          $scope.sortOptions.push(sortOptions[0]);
        }

        $scope.sortOrder = $scope.sortOptions[0].value;
      };

      var initialize = function() {
        $scope.refresh();
        initializeSortOptions($scope.config.sortOptions);
        $scope.identity = vtmsIdentity.currentUser;
        $scope.lesson = vtmsLesson.get({id: $scope.config.lessonId});
        $scope.assetList = vtmsTask.getAssets({id: $scope.config.lessonId});
      };

      initialize();

      $scope.getNameFromTaskId = function(id) {
        if($scope.assetList.length) {
          for(var i = 0; i < $scope.assetList.length; i++) {
            if($scope.assetList[i].id === id) { return $scope.assetList[i].taskGlobal.name; }
          }
          return false;
        }
      };

      $scope.newShotValues = {
        shot: 1,
        script: '',
        type: ''
      };

      $scope.newShot = function() {
        $scope.newShotValues.fkLesson = $scope.config.lessonId;
        var newShot = new vtmsShot($scope.newShotValues);
        newShot.$save().then(function(shot) {
          $scope.shotList[$scope.shotList.length] = shot;
        });

        $window.document.getElementById('newShot').focus();
        $scope.newShotValues = {
          shot: $scope.newShotValues.shot + 1,
          script: '',
          type: ''
        };
        vtmsNotifier.notify('Added new shot.');
      };

      $scope.deleteShot = function(shot) {
        vtmsList.deleteFromList(shot, $scope.shotList);
        vtmsNotifier.notify('Deleted a shot.');
      };
    }
  };
});
