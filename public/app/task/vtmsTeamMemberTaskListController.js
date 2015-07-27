angular.module('vtms').controller('vtmsTeamMemberTaskListController', function(vtmsTeamMember, vtmsTask, vtmsIdentity, vtmsNotifier, vtmsIssue) {
  var ctrl = this;
  
  ctrl.identity = vtmsIdentity.currentUser;
  ctrl.teamMember = vtmsTeamMember.get({id: ctrl.identity.fkTeamMember});
  ctrl.actionableTasks = vtmsTask.getActionableTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.activeTasks = vtmsTask.getActiveTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.issueList = vtmsIssue.getIssuesForTeamMember({id: ctrl.identity.fkTeamMember});
    
  ctrl.actionableTasksConfig = {
    title: 'Actionable Tasks',
    type : 'actionable',
    actions: {
      activate: true,
      deactivate: false,
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
  
  ctrl.activeTasksConfig = {
    title: 'Active Tasks',
    type : 'active',
    actions: {
      activate: false,
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
  
});