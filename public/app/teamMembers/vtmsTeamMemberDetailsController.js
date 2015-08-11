angular.module('vtms').controller('vtmsTeamMemberDetailsController', function($scope, vtmsTeamMember, vtmsTask, vtmsIssue, $routeParams) {
  var ctrl = this;
  
  var teamMemberId = $routeParams.id;
  
  ctrl.teamMember = vtmsTeamMember.get({id: teamMemberId});
  
  ctrl.actionableTasksConfig = {
    title: 'Task List',
    type: 'actionable',
    update: function() {
      return vtmsTask.getActionableTasksForMember({id: teamMemberId});
    },
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