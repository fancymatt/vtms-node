angular.module('vtms').directive('videoPlayer', function ($window, $timeout, $filter) {
  return {
    restrict: 'E',
    templateUrl: '/partials/video/video',
    scope: {
      config: '='
    },
    controller: function ($sce, $scope, $element, $rootScope) {
      var ctrl = this;
      ctrl.API = null;
      ctrl.validVideo = true;
      
      ctrl.onPlayerReady = function(API) {
        ctrl.API = API;
      };
      
      ctrl.onLoadDataError = function() {
        $scope.API.onVideoError();
      };
      
      ctrl.onUpdateTime = function(currentTime) {
        $rootScope.$broadcast('time:updated', currentTime);
      };
      
      ctrl.onError = function(error) {
        console.log("An error has occured");
        ctrl.validVideo = false;
      };
    },
    controllerAs: 'ctrl'
  }
});