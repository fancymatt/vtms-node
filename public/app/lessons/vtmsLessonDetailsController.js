angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsShot, vtmsTask, $routeParams, vtmsNotifier, $window) {
  
  $scope.lesson = vtmsLesson.get({id: $routeParams.id});
  
  $scope.shotList = vtmsShot.getList({id: $routeParams.id});
  $scope.newShotValues;
  $scope.taskList = vtmsTask.getList({id: $routeParams.id});
  $scope.assetList = vtmsTask.getAssets({id: $routeParams.id});
  
  function resetNewShotValues() {
    $scope.newShotValues.shot = "";
    $scope.newShotValues.script = "";
    $scope.newShotValues.type = "";
  };
  
  $scope.getAssetNameForTaskId = function(taskId) {
    for(var i = 0; i < $scope.assetList.length; i++) {
      if($scope.assetList[i].id === taskId) return $scope.assetList[i].taskGlobal.name;
    }
    return false;
  };
  
  $scope.newShot = function() {
    $scope.newShotValues.fkLesson = $scope.lesson.id;
    var newShot = new vtmsShot($scope.newShotValues);
    newShot.$save().then(function(shot) {
      $scope.shotList[$scope.shotList.length] = shot;
    });
        
    $window.document.getElementById("newShot").focus();
    
    resetNewShotValues();
    vtmsNotifier.notify("Added new shot.");
  }
  
  $scope.deleteShot = function(shot) {
    var indexToDelete = $scope.shotList.indexOf(shot);
    console.log("item at " + indexToDelete + " will be deleted");
    var shotToDelete = $scope.shotList[indexToDelete];
    console.log(shotToDelete);
    shotToDelete.$delete();
    $scope.shotList.splice(indexToDelete, 1);
    vtmsNotifier.notify("Deleted a shot.");
  }
}).directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
}).directive('autoGrow', function() {
  return function(scope, element, attr){
    var minHeight = element[0].offsetHeight,
      paddingLeft = element.css('paddingLeft'),
      paddingRight = element.css('paddingRight');
 
    var $shadow = angular.element('<div></div>').css({
      position: 'absolute',
      top: -10000,
      left: -10000,
      width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
      fontSize: element.css('fontSize'),
      fontFamily: element.css('fontFamily'),
      lineHeight: element.css('lineHeight'),
      resize:     'none'
    });
    angular.element(document.body).append($shadow);
 
    var update = function() {
      var times = function(string, number) {
        for (var i = 0, r = ''; i < number; i++) {
          r += string;
        }
        return r;
      }
 
      var val = element.val().replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;')
        .replace(/\n$/, '<br/>&nbsp;')
        .replace(/\n/g, '<br/>')
        .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
      $shadow.html(val);
 
      element.css('height', Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */, minHeight) + 'px');
    }
 
    element.bind('keyup keydown keypress change', update);
    update();
  }
});