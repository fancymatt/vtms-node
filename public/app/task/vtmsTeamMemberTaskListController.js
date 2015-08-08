angular.module('vtms').controller('vtmsTeamMemberTaskListController', function(vtmsTeamMember, vtmsTask, vtmsIdentity, vtmsNotifier, vtmsIssue, vtmsActivity) {
  var ctrl = this;
  
  ctrl.identity = vtmsIdentity.currentUser;
  ctrl.userId = ctrl.identity.fkTeamMember;
  ctrl.teamMember = vtmsTeamMember.get({id: ctrl.identity.fkTeamMember});
  ctrl.actionableTasks = vtmsTask.getActionableTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.activeTasks = vtmsTask.getActiveTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.issueList = vtmsIssue.getIssuesForTeamMember({id: ctrl.identity.fkTeamMember});
  ctrl.activityList = vtmsActivity.getRecentListForTeamMember({id: ctrl.identity.fkTeamMember});
    
  ctrl.actionableTasksConfig = {
    title: 'Your Tasks',
    type : 'actionable',
    actions: {
      activate: true,
      deactivate: true,
      complete: true,
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

  ctrl.issuesConfig = {
    title: 'Pending Issues',
    actions: {
      complete: true,
      delete: false,
      reassign: false,
      getTime: false
    },
    columns: {
      lesson: true,
      task: true,
      timecode: true,
      issue: true,
      creator: true
    }
  };
  
  ctrl.activityListConfig = {
    title: 'Your Activities',
    actions: {
      delete: true,
      complete: true,
      deactivate: true
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
    },
    create: true
  };
  
});