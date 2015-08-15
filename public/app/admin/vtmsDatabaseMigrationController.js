angular.module('vtms').controller('vtmsDatabaseMigrationController', function($scope, vtmsSeries, vtmsLesson, vtmsTask, vtmsPublishDate) {
  
  $scope.series = vtmsSeries.query();
  
  $scope.createPublishDates = function(seriesId) {
    // Create Publish Date entries
    // Set as completed if completed
    console.log('createPublishDates for '+ seriesId);
    
    vtmsLesson.getLessonsForSeries({id: seriesId}, function(lessons) {
      lessons.forEach(function(lesson) {
        console.log("Looking at lesson id: " + lesson.id);
        if(lesson.publishDateSite !== '0000-00-00') {
          console.log("  has publishDateSite of: " + lesson.publishDateSite);
          var pd = new vtmsPublishDate({
            fkLesson: lesson.id,
            fkPlatform: 1,
            date: lesson.publishDateSite,
            isDelivered: lesson.isDetected,
            deliveredTime: lesson.detectedTime
          });
          pd.$save();
        }
        if(lesson.publishDateYouTube !== '0000-00-00') {
          console.log("  has publishDateYouTube of: " + lesson.publishDateYouTube);
          var pd = new vtmsPublishDate({
            fkLesson: lesson.id,
            fkPlatform: 2,
            date: lesson.publishDateYouTube,
            isDelivered: lesson.isUploadedYt,
            deliveredTime: lesson.uploadedYtTime
          });
          pd.$save();
        }
      });
    });
                   
  };
  
  $scope.updateLessonsAndTasks = function(seriesId) {
    console.log('updateLessonsAndTasks: ' + seriesId);
    
    vtmsLesson.getLessonsForSeries({id: seriesId}, function(lessons) {
      
      lessons.forEach(function(lesson) {

        var completionValue = 0;
        var maxCompletionValue = 0;
        var lessonUpdateObject = {};
        
        vtmsTask.getList({id: lesson.id}, function(tasks) {
          
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
          if(completionValue >= lesson.languageSery.series.shotAt) {
            console.log("Lesson completion value is " + completionValue + " and threshold is " + lesson.languageSery.series.shotAt + " so marking as shot");
            lessonUpdateObject.isShot = true;
          }

          if(completionValue >= lesson.languageSery.series.checkableAt) {
            console.log("Lesson completion value is " + completionValue + " and threshold is " + lesson.languageSery.series.checkableAt + " so marking as checkable");
            lessonUpdateObject.isCheckable = true;
          }

          if(completionValue >= maxCompletionValue) {
            console.log("Lesson completion value is " + completionValue + " and max is " + maxCompletionValue + " so all tasks are complete");
           lessonUpdateObject.allTasksCompleted = true;
          }
          
          lesson.update(lessonUpdateObject);

          // Now loop through the tasks again, this time updating isActionable
          for(var i = 0; i < tasks.length; i++) {
            console.log("task: " + tasks[i].taskGlobal.name + " is actionable at " + tasks[i].taskGlobal.actionableAt + " and it's currently " + completionValue);
            if(completionValue >= tasks[i].taskGlobal.actionableAt) {
              console.log("setting as actionable");
              if(tasks[i].isActionable !== true) tasks[i].update({isActionable: true});
            }
          }
          
        });
          
      });
      
    });
    
  };
  
  $scope.updateActivities = function() {
    // populate fkTeamMember field based on fkShift
    console.log('updateActivities');
  };
  
  $scope.updateIssues = function() {
    // populate fkLesson based on fkTask
    console.log('updateIssues');
  };
  
});