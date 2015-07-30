angular.module('vtms').factory('vtmsLesson', function($resource, $q, vtmsNotifier) {
  var LessonResource = $resource('/api/lessons/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false},
    getList: {method:'GET', url: '/api/languageSeries/:id/lessons', isArray: true},
    getQueued: {method:'GET', url: '/api/lessons/queued', isArray: true},
    getReadyToRender: {method:'GET', url: '/api/lessons/readyToRender', isArray: true},
    getIssues: {method:'GET', url: '/api/lessons/issues', isArray: true}
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
    
    var lessonString = this.languageSery.title + " #" + this.number + " - " + this.title;
    var notification = "Added " + lessonString + " to the render queue.";
    
    this.update({
      isQueued: true,
      queuedTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  LessonResource.prototype.removeFromRenderQueue = function() {
    var dfd = $q.defer();
    
    var lessonString = this.languageSery.title + " #" + this.number + " - " + this.title;
    var notification = "Removed " + lessonString + " from the render queue.";
    
    this.update({
      isQueued: false
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  LessonResource.prototype.updateBenchmarks = function(tasks) {
    var dfd = $q.defer();
    
    var completionValue = 0;
    for(var i = 0; i < tasks.length; i++) {
      if(tasks[i].isCompleted) {
        console.log(tasks[i]);
        console.log("Task: " + tasks[i].taskGlobal.name + " is complete, adding completion value of " + tasks[i].taskGlobal.completionValue);
        completionValue += tasks[i].taskGlobal.completionValue;
      }
    }
    // Stuck at line below: "Series is undefined"
    if(completionValue >= this.languageSery.series.checkableAt) {
      console.log("Lesson completion value is " + completionValue + " and threshold is " + this.languageSery.series.checkableAt + " so marking as checkable");
      this.update({isCheckable: true}).then(function(newData) {
        return dfd.resolve(newData);
      });
    }
    
    return dfd.promise;
  }
  
  LessonResource.prototype.markAsExported = function() {
    var dfd = $q.defer();
    
    var lessonString = this.languageSery.title + " #" + this.number + " - " + this.title;
    var notification = lessonString + " has been successfully exported.";
    
    this.update({
      isQueued: false,
      exportedTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  LessonResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject("You don't have permission to edit.");
    });
    
    return dfd.promise;
  };
  
  return LessonResource;
});