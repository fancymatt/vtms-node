angular.module('vtms').controller('vtmsLessonDetailsController', function($scope, vtmsLesson, vtmsIssue, vtmsShot, vtmsTask, vtmsPublishDate, vtmsActivity, $routeParams) {
  var ctrl = this;
  ctrl.lessonId = $routeParams.id;
  ctrl.lesson = vtmsLesson.get({id: ctrl.lessonId});

  ctrl.tasksConfig = {
    title: 'Tasks',
    type: 'default',
    update: function() {
      return vtmsTask.getList({id: ctrl.lessonId});
    },
    actions: {
      activate: true,
      deactivate: true,
      complete: true,
      incomplete: true,
      reassign: true
    },
    columns: {
      task: true,
      teamMember: true,
      status: true,
      dueDate: true
    }
  };

  ctrl.issuesConfig = {
    title: 'Issues',
    update: function() {
      return vtmsIssue.getListForLesson({id: ctrl.lessonId});
    },
    actions: {
      complete: true,
      delete: true,
    },
    columns: {
      actions: true,
      task: true,
      timecode: true,
      issue: true,
      status: true,
      creator: true
    }
  };

  ctrl.shotsConfig = {
    title: 'Shots',
    sortable: false,
    lessonId: ctrl.lessonId,
    update: function() {
      return vtmsShot.getList({id: ctrl.lessonId});
    },
    actions: {},
    columns: {
      actions: true
    }
  };

  ctrl.publishDatesConfig = {
    title: 'Publish Dates',
    update: function() {
      return vtmsPublishDate.getListForLesson({id: ctrl.lessonId});
    },
    actions: {
      delete: true
    },
    sortOptions: {
      date: false
    },
    columns: {
      actions: true,
      platform: true,
      date: true,
      status: true
    }
  };

  ctrl.activityListConfig = {
    title: 'Activity History',
    sortable: false,
    update: function() {
      return vtmsActivity.getListForLesson({id: ctrl.lessonId});
    },
    actions: {
      delete: true,
    },
    columns: {
      actions: true,
      teamMember: true,
      activity: true,
      endTime: true,
      duration: true
    },
    activityDetail: {
      task: true
    }
  };

});
