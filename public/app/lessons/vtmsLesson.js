angular.module('vtms').factory('vtmsLesson', function($resource, $q, vtmsNotifier) {
  var LessonResource = $resource('/api/lessons/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false},
    getList: {method:'GET', url: '/api/languageSeries/:id/lessons', isArray:true},
    getQueued: {method:'GET', url: '/api/lessons/queued', isArray: true},
    getReadyToRender: {method:'GET', url: '/api/lessons/readyToRender', isArray: true},
    getIssues: {method:'GET', url: '/api/lessons/issues', isArray: true},
    getLessonsWithIssuesForMember: {method: 'GET', url: '/api/lessons/issues/team-member/:id', isArray: true},
    getVideoCheckLessons: {method: 'GET', url: '/api/lessons/video-checkable', isArray: true},
    getArchivableLessons: {method: 'GET', url: '/api/lessons/archivable', isArray: true},
    getQaLessons: {method: 'GET', url: '/api/lessons/qa', isArray: true},
    getLessonsWithUnassignedIssues: {method: 'GET', url: '/api/issues/lessons/unassigned', isArray: true}
  });
  
  
  LessonResource.prototype.dueDate = function() {
    if(this.publishDates.length > 1) {
      var earliestDate = new Date(this.publishDates[0].date);
      for(var i = 1, dateToCompare; i < this.publishDates.length; i++) {
        dateToCompare = new Date(this.publishDates[i].date);
        if(dateToCompare < earliestDate) earliestDate = dateToCompare;
      }
      return earliestDate;
    } else if(this.publishDates.length === 1) {
      return new Date(this.publishDates[0].date)
    } else {
      return "Not set";
    }
    
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
    var maxCompletionValue = 0;
    
    // Loop through all tasks and calculate completion value
    for(var i = 0; i < tasks.length; i++) {
      maxCompletionValue += tasks[i].taskGlobal.completionValue;
      if(tasks[i].isCompleted) {
        if(tasks[i].taskGlobal.isAsset) {
          if(tasks[i].isDelivered) {
            // Assets which are completed and delivered
            console.log("Task: " + tasks[i].taskGlobal.name + " is complete and delivered, adding completion value of " + tasks[i].taskGlobal.completionValue);
            completionValue += tasks[i].taskGlobal.completionValue;
          }
        } else {
          // Tasks which are completed
          console.log("Task: " + tasks[i].taskGlobal.name + " is complete, adding completion value of " + tasks[i].taskGlobal.completionValue);
          completionValue += tasks[i].taskGlobal.completionValue;
        }
      }
    }
    
    // Check how completion value affects lesson benchmarks
    if(completionValue >= this.languageSery.series.shotAt) {
      console.log("Lesson completion value is " + completionValue + " and threshold is " + this.languageSery.series.shotAt + " so marking as shot");
      this.update({isShot: true}).then(function(newData) {
        return dfd.resolve(newData);
      });
    }
    
    if(completionValue >= this.languageSery.series.checkableAt) {
      console.log("Lesson completion value is " + completionValue + " and threshold is " + this.languageSery.series.checkableAt + " so marking as checkable");
      this.update({isCheckable: true}).then(function(newData) {
        return dfd.resolve(newData);
      });
    }
    
    if(completionValue >= maxCompletionValue) {
      console.log("Lesson completion value is " + completionValue + " and max is " + maxCompletionValue + " so all tasks are complete");
      this.update({allTasksCompleted: true}).then(function(newData) {
        return dfd.resolve(newData);
      });
    }
    
    // Now loop through the tasks again, this time updating isActionable
    for(var i = 0; i < tasks.length; i++) {
      console.log("task: " + tasks[i].taskGlobal.name + " is actionable at " + tasks[i].taskGlobal.actionableAt + " and it's currently " + completionValue);
      if(completionValue >= tasks[i].taskGlobal.actionableAt) {
        console.log("setting as actionable");
        tasks[i].update({isActionable: true});
      } else {
        tasks[i].update({isActionable: false});
      }
    }
    
    return dfd.promise;
  }
  
  LessonResource.prototype.markAsExported = function() {
    var dfd = $q.defer();
    
    var lessonString = this.languageSery.title + " #" + this.number + " - " + this.title;
    var notification = lessonString + " has been successfully exported.";
    
    var startTime = moment(Date.now());
    this.update({
      isQueued: false,
      exportedTime: startTime.format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  LessonResource.prototype.markAsVideoChecked = function() {
    var dfd = $q.defer();
    
    var lessonString = this.languageSery.title + " #" + this.number + " - " + this.title;
    var notification = lessonString + " has been marked as video checked.";
    
    this.update({
      checkedVideo: true,
      checkedVideoTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response);
    });
    
    return dfd.promise;
  };

  LessonResource.prototype.markAsLanguageChecked = function() {
    var dfd = $q.defer();
    
    var lessonString = this.languageSery.title + " #" + this.number + " - " + this.title;
    var notification = lessonString + " has been marked as language checked.";
    
    this.update({
      checkedLanguage: true,
      checkedLanguageTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response);
    });
    
    return dfd.promise;
  };
  
   LessonResource.prototype.markAsArchived = function() {
    var dfd = $q.defer();
    
    var lessonString = this.languageSery.title + " #" + this.number + " - " + this.title;
    var notification = lessonString + " has been marked as video checked.";
    
    this.update({
      filesMoved: true,
      filesMovedTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  LessonResource.prototype.delete = function() {
    var dfd = $q.defer();
    
    // Remove all related records;
    
    this.$delete().then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to delete.");
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