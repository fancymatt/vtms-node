angular.module('vtms').controller('vtmsCheckingController', function($scope, vtmsLesson, vtmsIssue, $routeParams, vtmsNotifier, $sce, $q) {
  var ctrl = this;
  
  ctrl.issuesConfig = {
    actions: {
      delete: true,
      reassign: false,
      getTime: true
    },
    columns: {
      task: false,
      timecode: true,
      issue: true,
      status: true,
      creator: false
    }
  };
  
  ctrl.lessonId = $routeParams.id;
  
  cleanUrl = function(url) {
    var index = url.indexOf('.mp4');
    var cleanedUrl = url.slice(0, index + 4);
    return cleanedUrl + "?dl=1";
  };
  
  vtmsLesson.get({id: ctrl.lessonId}, function(lesson) {
    ctrl.lesson = lesson;
    ctrl.config.sources[0].src = $sce.trustAsResourceUrl(cleanUrl(lesson.qaUrl));
  });
  
  ctrl.config = {
    sources: [
      {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"}
    ], 
    theme: {
      url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
    }
  };
  
  $scope.$on('time:updated', function(event, time) {
    ctrl.currentTime = time;
  });
});