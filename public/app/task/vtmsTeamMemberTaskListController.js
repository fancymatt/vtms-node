angular.module('vtms').controller('vtmsTeamMemberTaskListController', function(vtmsTeamMember, vtmsTask, vtmsIdentity, vtmsNotifier, vtmsIssue) {
  var ctrl = this;
  
  ctrl.identity = vtmsIdentity.currentUser;
  ctrl.teamMember = vtmsTeamMember.get({id: ctrl.identity.fkTeamMember});
  ctrl.actionableTasks = vtmsTask.getActionableTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.activeTasks = vtmsTask.getActiveTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.issueList = vtmsIssue.getIssuesForTeamMember({id: ctrl.identity.fkTeamMember});
  
  ctrl.sortOptions = [
    {value: "dueDate()", text: "Sort by Due Date"},
    {value: "taskGlobal.name", text: "Sort by Task Type"}
  ];
  
  ctrl.selectedSortOption = ctrl.sortOptions[0].value;

});