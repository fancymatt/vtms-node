angular.module('vtms').controller('vtmsTeamMemberDetailsController', function($scope, vtmsTeamMember, vtmsTask, vtmsIssue, $routeParams) {
  var ctrl = this;
  
  teamMemberId = $routeParams.id
  ctrl.teamMember = vtmsTeamMember.get({id: teamMemberId});
  ctrl.actionableTasks = vtmsTask.getActionableTasksForMember({id: teamMemberId});
  ctrl.activeTasks = vtmsTask.getActiveTasksForMember({id: teamMemberId});
  //ctrl.issueList = vtmsIssue.getIssuesForTeamMember({id: teamMemberId});
  //ctrl.completedTasks
  
  ctrl.updateActionableTasks = function() {
    return vtmsTask.getActionableTasksForMember({id: teamMemberId});
  }
  
  ctrl.activeTasksConfig = {
    title: 'Active Tasks',
    type: 'active',
    actions: {
      activate: false,
      deactivate: true,
      complete: true,
      incomplete: false
    },
    columns: {
      lesson: true,
      task: true,
      teamMember: false,
      status: false,
      dueDate: true
    }
  };
  
  ctrl.actionableTasksConfig = {
    title: 'Task List',
    type: 'actionable',
    actions: {
      activate: true,
      deactivate: false,
      complete: true,
      incomplete: false
    },
    columns: {
      lesson: true,
      task: true,
      teamMember: false,
      status: false,
      dueDate: true
    }
  };
  
});