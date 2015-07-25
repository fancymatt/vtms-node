angular.module('vtms').controller('vtmsCheckingController', function($scope, vtmsLesson, $routeParams, vtmsNotifier, $sce, $q) {
  var ctrl = this;
  ctrl.lessonId = $routeParams.id;
  ctrl.lesson = vtmsLesson.get({id: ctrl.lessonId}, function(lesson) {
    var lessonUrl = cleanUrl(lesson.qaUrl);
    console.log(lessonUrl)
    ctrl.config.sources[0] = {src: $sce.trustAsResourceUrl(lessonUrl), type: "video/mp4"};
    console.log(ctrl.config);
  });
  
  cleanUrl = function(url) {
    var index = url.indexOf('.mp4');
    var cleanedUrl = url.slice(0, index + 4);
    return cleanedUrl + "?dl=1";
  };
  
  ctrl.config = {
    sources: [],
    theme: {
      url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
    }
  };
  
  ctrl.videoCurrentTime = "";
});