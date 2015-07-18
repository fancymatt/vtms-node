angular.module('vtms').factory('vtmsLesson', function($resource, $q) {
  var LessonResource = $resource('/api/lessons/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false},
    getList: {method:'GET', url: '/api/languageSeries/:id/lessons', isArray:true},
    getQueued: {method:'GET', url: '/api/lessons/queued', isArray: true},
    getReadyToRender: {method:'GET', url: '/api/lessons/readyToRender', isArray: true}
  });
  
  LessonResource.prototype.dueDate = function() {
    var earliestDate = new Date(this.publishDates[0].date);
    if(this.publishDates.length > 1) {
      for(var i = 1, dateToCompare; i < this.publishDates.length; i++) {
        dateToCompare = new Date(this.publishDates[i].date);
        if(dateToCompare < earliestDate) earliestDate = dateToCompare;
      }
    }
    return earliestDate;
  };
  
  LessonResource.prototype.addToRenderQueue = function() {
    var dfd = $q.defer();
    var startTime = moment(Date.now());
    this.update({
      isQueued: true,
      queuedTime: startTime.format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  LessonResource.prototype.removeFromRenderQueue = function() {
    var dfd = $q.defer();
    this.update({
      isQueued: false
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  LessonResource.prototype.markAsExported = function() {
    var dfd = $q.defer();
    var startTime = moment(Date.now());
    this.update({
      isQueued: false,
      exportedTime: startTime.format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  LessonResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to edit.");
    });
    return dfd.promise;
  };
  
  return LessonResource;
});