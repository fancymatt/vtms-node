angular.module('vtms').controller('vtmsTeamMemberTaskListController', function($rootScope, vtmsTeamMember, vtmsTask, vtmsLesson, vtmsIdentity, vtmsIssue, vtmsActivity) {
  var ctrl = this;

  ctrl.identity = vtmsIdentity.currentUser;
  ctrl.userId = ctrl.identity.fkTeamMember;
  ctrl.teamMember = vtmsTeamMember.get({id: ctrl.identity.fkTeamMember});

  ctrl.beginFixingIssues = function(task) {
    console.log('task', task);
    // create a new activity
    $rootScope.$broadcast('activity:toBeAdded');
    var newActivity = new vtmsActivity();
    newActivity.createActivityForIssues(task).then(function(activity) {
      $rootScope.$broadcast('activity:created', activity);
    });

    // allow using the buttons on the underlying task
    ctrl.issuesConfig.taskBeingFixed = task.id;
  };

  ctrl.actionableTasksConfig = {
    title: 'Your Tasks',
    type: 'actionable',
    update: function() {
      return vtmsTask.getActionableTasksForMember({id: ctrl.identity.fkTeamMember});
    },
    actions: {
      activate: true,
      deactivate: true,
      complete: false,
      incomplete: false,
    },
    columns : {
      lesson: true,
      task: true,
      teamMember: false,
      status: false,
      dueDate: true
    }
  };

  ctrl.undeliveredTasksConfig = {
    title: 'Your Undelivered Assets',
    type: 'undeliveredAssets',
    update: function() {
      return vtmsTask.getUndeliveredTasksForTeamMember({id: ctrl.identity.fkTeamMember});
    },
    actions: {
      activate: true,
      deactivate: true,
      complete: false,
      incomplete: false,
    },
    columns : {
      lesson: true,
      task: true,
      teamMember: false,
      status: false,
      dueDate: true
    }
  };

  ctrl.teamMemberIssuesListConfig = {
    title: 'Your Issues',
    update: function() {
      return vtmsTask.getTasksForTeamMemberWithIssues({id: ctrl.identity.fkTeamMember});
    }
  };

  ctrl.activityListConfig = {
    title: 'Your Activities',
    create: true,
    sortable: false,
    teamMemberId: ctrl.userId,
    update: function() {
      return vtmsActivity.getRecentListForTeamMember({id: ctrl.identity.fkTeamMember});
    },
    actions: {
      delete: true,
      complete: true,
      deactivate: true
    },
    sortOptions: {
      lesson: true
    },
    columns: {
      actions: true,
      teamMember: false,
      activity: true,
      startTime: true,
      endTime: true,
      duration: true
    },
    activityDetail: {
      series: true,
      lesson: true,
      task: true
    }

  };

});
