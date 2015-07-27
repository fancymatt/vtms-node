angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsIssue, vtmsTask, $routeParams) {
  var ctrl = this;
  ctrl.lessonId = $routeParams.id;
  ctrl.lesson = vtmsLesson.get({id: ctrl.lessonId});
  ctrl.taskList = vtmsTask.getList({id: ctrl.lessonId});
  ctrl.issuesList = vtmsIssue.getListForLesson({id: ctrl.lessonId});
  
  ctrl.tasksConfig = {
    title: 'Tasks',
    type: 'default',
    actions: {
      activate: true,
      deactivate: true,
      complete: true,
      incomplete: true,
    },
    columns: {
      lesson: false,
      task: true,
      teamMember: true,
      status: true,
      dueDate: true
    }
  }
  
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
  }
  
});