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
  
  ctrl.issuesConfig = {
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
  }
  
  ctrl.selectedSortOption = ctrl.sortOptions[0].value;

});