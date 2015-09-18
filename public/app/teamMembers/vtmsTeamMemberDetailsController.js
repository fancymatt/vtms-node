angular.module('vtms').controller('vtmsTeamMemberDetailsController', function($scope, vtmsTeamMember, vtmsTask, vtmsActivity, vtmsIssue, $routeParams) {
  var ctrl = this;

  var teamMemberId = $routeParams.id;

  ctrl.teamMember = vtmsTeamMember.get({id: teamMemberId});

  ctrl.actionableTasksConfig = {
    title: 'Actionable Tasks',
    type: 'actionable',
    update: function() {
      return vtmsTask.getActionableTasksForMember({id: teamMemberId});
    },
    actions: {
      activate: false,
      deactivate: false,
      complete: true,
      incomplete: false,
      reassign: true
    },
    columns: {
      shortLesson: true,
      task: true,
      teamMember: false,
      status: false,
      dueDate: true
    }
  };

  ctrl.undeliveredTasksConfig = {
    title: 'Undelivered Assets',
    type: 'undeliveredAssets',
    update: function() {
      return vtmsTask.getUndeliveredTasksForTeamMember({id: teamMemberId});
    },
    actions: {
      activate: false,
      deactivate: false,
      complete: false,
      incomplete: false,
    },
    columns : {
      shortLesson: true,
      task: true,
      teamMember: false,
      status: false,
      dueDate: true
    }
  };

  ctrl.teamMemberIssuesListConfig = {
    title: 'Issues',
    update: function() {
      return vtmsTask.getTasksForTeamMemberWithIssues({id: teamMemberId});
    }
  };

  ctrl.activityListConfig = {
    title: 'Activities',
    create: false,
    sortable: false,
    teamMemberId: teamMemberId,
    update: function() {
      return vtmsActivity.getRecentListForTeamMember({id: teamMemberId});
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
