angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsIssue, vtmsTask, vtmsPublishDate, vtmsActivity, $routeParams) {
  var ctrl = this;
  ctrl.lessonId = $routeParams.id;
  ctrl.lesson = vtmsLesson.get({id: ctrl.lessonId});
  ctrl.taskList = vtmsTask.getList({id: ctrl.lessonId});
  ctrl.issuesList = vtmsIssue.getListForLesson({id: ctrl.lessonId});
  ctrl.publishDatesList = vtmsPublishDate.getListForLesson({id: ctrl.lessonId});
  ctrl.activityList = vtmsActivity.getListForLesson({id: ctrl.lessonId});
  
  ctrl.tasksConfig = {
    title: 'Tasks',
    type: 'default',
    actions: {
      activate: true,
      deactivate: true,
      complete: true,
      incomplete: true,
      reassign: true
    },
    columns: {
      lesson: false,
      task: true,
      teamMember: true,
      status: true,
      dueDate: true
    }
  };
  
  ctrl.issuesConfig = {
    actions: {
      complete: true,
      delete: true,
      reassign: false,
      getTime: false
    },
    columns: {
      lesson: false,
      task: true,
      timecode: true,
      issue: true,
      status: true,
      creator: true
    }
  };
  
  ctrl.publishDatesConfig = {
    title: 'Publish Dates',
    actions: {
      deliver: false,
      delete: true
    },
    columns: {
      actions: true,
      series: false,
      number: false,
      title: false,
      platform: true,
      date: true,
      lessonStatus: false,
      status: true
    }
  };
  
  ctrl.activityListConfig = {
    title: 'Activity History',
    actions: {
      delete: true,
      complete: false
    },
    columns: {
      actions: true,
      teamMember: true,
      activity: true,
      startTime: false,
      endTime: true,
      duration: true
    },
    activityDetail: {
      series: false,
      lesson: false,
      task: true
    }
  };
  
});