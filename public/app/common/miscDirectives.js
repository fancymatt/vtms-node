angular.module('vtms')
.directive('convertToNumber', function() {
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
})
.filter('videoTime', function() {
  return function(input) {
    input = Math.floor(input);

    //Less than an hour
    if (input < 3600) {
      var minutes = Math.floor(input / 60);
      var seconds = input - (minutes * 60);
      return minutes + ":" + ("0" + seconds).slice(-2);
    }
    //one hour or more
    else {
      var hours = Math.floor(input / 3600);
      var minutes = Math.floor((input - (hours * 3600)) / 60);
      var seconds = input - (hours * 3600) - (minutes * 60);
      return hours + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    }
  };
})
.directive('someVideo', function ($window, $timeout, $filter) {
    return {
        scope: {
            videoCurrentTime: "=videoCurrentTime"
        },
        controller: function ($scope, $element) {

            $scope.onTimeUpdate = function () {
                var currTime = $element[0].currentTime;
                if (currTime - $scope.videoCurrentTime > 0.5 || $scope.videoCurrentTime - currTime > 0.5) {
                    $element[0].currentTime = $scope.videoCurrentTime;
                }
                $scope.$apply(function () {
                    $scope.videoCurrentTime = $filter('videoTime')($element[0].currentTime);
                });
            }
        },
        link: function (scope, elm) {
            // Use this $watch to restart the video if it has ended
            scope.$watch('videoCurrentTime', function (newVal) {

                if (elm[0].ended) {
                    // Do a second check because the last 'timeupdate'
                    // after the video stops causes a hiccup.
                    if (elm[0].currentTime !== newVal) {
                        elm[0].currentTime = newVal;
                        elm[0].play();
                    }
                }
            });
            // Otherwise keep any model syncing here.
            elm.bind('timeupdate', scope.onTimeUpdate);
        }
    }
});
