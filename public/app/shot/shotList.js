angular.module('vtms').directive('shotList', function() {
  return {
    templateUrl: "/partials/shot/shot-list",
    restrict: "E",
    scope: {
      lesson: '=',
      config: '=',
      updateFn: '&'
    },
    controller: function($scope, $window, vtmsShot, vtmsTask, vtmsNotifier) {
      
      $scope.lesson.$promise.then(function(lesson) {
        $scope.shotList = vtmsShot.getList({id: $scope.lesson.id});
        $scope.assetList = vtmsTask.getAssets({id: $scope.lesson.id});
      });

      function deleteFromList(item, list) {
        var index = list.indexOf(item);
        var itemToDelete = list[index];
        itemToDelete.delete().then(function() {
          list.splice(index, 1);
        });
      };
      
      $scope.getNameFromTaskId = function(id) {
        if($scope.assetList.length) {
          for(var i = 0; i < $scope.assetList.length; i++) {
            if($scope.assetList[i].id === id) return $scope.assetList[i].taskGlobal.name;
          }
          return false;
        }
      };

      $scope.newShotValues = {
        shot: 1,
        script: "",
        type: ""
      };
      
      $scope.sortOptions = [{value: ['section', 'shot'], text: "Sort Chronologically"}];
      
      if($scope.config.sortOptions) {
        if($scope.config.sortOptions.section) $scope.sortOptions.push({value: "section", text: "Sort by Section"});
        if($scope.config.sortOptions.shot) $scope.sortOptions.push({value: "shot", text: "Sort by Shot"});
        if($scope.config.sortOptions.type) $scope.sortOptions.push({value: "type", text: "Sort by Type"});
        if($scope.config.sortOptions.script) $scope.sortOptions.push({value: "script", text: "Sort by Script"});
        if($scope.config.sortOptions.asset) $scope.sortOptions.push({value: "asset", text: "Sort by Asset"});  
      }
      
      $scope.sortOrder = $scope.sortOptions[0].value;
      
      $scope.refreshList = function() {
        $scope.shotList = $scope.updateFn();
      };
            
      
      $scope.newShot = function() {
        $scope.newShotValues.fkLesson = $scope.lessonId;
        var newShot = new vtmsShot($scope.newShotValues);
        newShot.$save().then(function(shot) {
          $scope.shotList[$scope.shotList.length] = shot;
        });

        $window.document.getElementById("newShot").focus();
        $scope.newShotValues = {
          shot: $scope.newShotValues.shot + 1,
          script: "",
          type: ""
        }
        vtmsNotifier.notify("Added new shot.");
      };

      $scope.deleteShot = function(shot) {
        deleteFromList(shot, $scope.shotList);
        vtmsNotifier.notify("Deleted a shot.");
      };
    }
  }
});