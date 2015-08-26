angular.module('vtms').controller('vtmsDatabaseMigrationController', function($scope, vtmsSeries, vtmsActivity, vtmsLesson, vtmsIssue, vtmsTask, vtmsPublishDate) {

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

          if(lessonUpdateObject.isShot) lesson.update(lessonUpdateObject);

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
    vtmsActivity.query({}, function(activities) {
      activities.forEach(function(activity) {
        if(activity.shift && activity.fkTeamMember < 1) activity.update({fkTeamMember: activity.shift.fkTeamMember});
      });
    });
  };

  $scope.updateIssuesRelationship = function() {
    console.log('updateIssuesRelationship');
    vtmsIssue.query({}, function(issues) {
      issues.forEach(function(issue) {
        if(issue.task && issue.fkLesson < 1) issue.update({fkLesson: issue.task.fkLesson});
      });
    });
  };

  $scope.updateLastTask = function(seriesId) {
    vtmsLesson.getLessonsForSeries({id: seriesId}, function(lessons) {
      lessons.forEach(function(lesson) {
        vtmsTask.getLastTaskForLesson({id: lesson.id}, function(task) {
          if(task.id) {
            console.log('Lesson ' + lesson.id + ' last task is ' + task.id + '.');
            lesson.update({fkLastTask: task.id, lastTaskTime: task.timeCompleted});
          }
        });
      });
    });

  };

  $scope.updateLastIssue = function(seriesId) {
    console.log('updateLastIssue for ' + seriesId);
    vtmsLesson.getLessonsForSeries({id: seriesId}, function(lessons) {
      lessons.forEach(function(lesson) {
        vtmsIssue.getLastIssueForLesson({id: lesson.id}, function(issue) {
          if(issue.id) {
            console.log('Lesson ' + lesson.id + ' last issue is ' + issue.id + '.');
            lesson.update({fkLastIssue: issue.id, lastIssueTime: issue.timeCompleted});
          }
        });
      });
    });
  };

  $scope.updateIncompleteIssues = function(seriesId) {
    // populate fkLesson based on fkTask
    // add incomplete issues
    console.log('updateIssues for ' + seriesId);
    vtmsLesson.getLessonsForSeries({id: seriesId}, function(lessons) {

      lessons.forEach(function(lesson) {

        vtmsIssue.getListForLesson({id: lesson.id}, function(issues) {
          var incompletedIssues = 0;

          issues.forEach(function(issue) {
            if(!issue.isCompleted) incompletedIssues++;
          });

          console.log("Lesson " + lesson.id + " has " + incompletedIssues + " incompleted issues");
          if(incompletedIssues > 0) lesson.update({incompleteIssues: incompletedIssues});

        });

      });

    });
  };

});
