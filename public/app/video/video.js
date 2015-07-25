angular.module('vtms').directive('videoPlayer', function ($window, $timeout, $filter) {
  return {
    restrict: 'E',
    templateUrl: '/partials/video/video',
    scope: {
      config: '='
    },
    controller: function ($sce, $scope, $element) {
      var ctrl = this;
      ctrl.API = null;
      
      ctrl.onPlayerReady = function(API) {
        ctrl.API = API;
      };
      
      ctrl.onLoadData = function(sources) {
        ctrl.API.sources = $scope.config.sources;
      };
      
      ctrl.onLoadDataError = function() {
        $scope.API.onVideoError();
      };
      
      ctrl.onTimeUpdate = function () {
        var currTime = $element[0].currentTime;
        if (currTime - $scope.time > 0.5 || $scope.time - currTime > 0.5) {
          $element[0].currentTime = $scope.time;
        }
        ctrl.$apply(function () {
          $scope.time = $filter('videoTime')($element[0].currentTime);
        });
      }
    },
    controllerAs: 'ctrl',
    link: function (scope, elm, attr) {
      elm.bind('timeupdate', scope.onTimeUpdate);
    }
  }
});