angular.module('vtms').controller('vtmsTeamMemberTaskListController', function(vtmsTeamMember, vtmsTask, vtmsIdentity, vtmsNotifier) {
  var ctrl = this;
  
  ctrl.identity = vtmsIdentity.currentUser;
  ctrl.teamMember = vtmsTeamMember.get({id: ctrl.identity.fkTeamMember});
  ctrl.actionableTasks = vtmsTask.getActionableTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.activeTasks = vtmsTask.getActiveTasksForMember({id: ctrl.identity.fkTeamMember});
  
  ctrl.sortOptions = [
    {value: "dueDate()", text: "Sort by Due Date"},
    {value: "taskGlobal.name", text: "Sort by Task Type"}
  ];
  
  ctrl.selectedSortOption = ctrl.sortOptions[0].value;
  
  var removeFromList = function(object, list) {
    list.splice(list.indexOf(object),1);
  }
  
  var addToList = function(object, list) {
    list.push(object);
  }
  
  ctrl.activateTask = function(task) {
    task.activate().then(function(newData) {
      angular.extend(task, newData);
      addToList(task, ctrl.activeTasks);
      removeFromList(task, ctrl.actionableTasks);
      vtmsNotifier.notify("Activated " + task.toString() + ".");
    });
  }
  
  ctrl.completeTask = function(task) {
    task.complete().then(function(newData) {
      angular.extend(task, newData);
      removeFromList(task, ctrl.activeTasks);
      var durationString = moment.duration(newData.timeRunning, 'seconds');
      var notification = "";
      notification += "Completed " + task.toString() + ".\n";
      notification += "It took " + durationString.humanize() + "."
      vtmsNotifier.success(notification);
    });
  }
  
  ctrl.deactivateTask = function(task) {
    task.deactivate().then(function(newData) {
      angular.extend(task, newData);
      addToList(task, ctrl.actionableTasks);
      removeFromList(task, ctrl.activeTasks);
      var durationString = moment.duration(newData.timeRunning, 'seconds');
      var notification = "";
      notification += "Deactivated " + task.toString() + ".\n";
      notification += "You've worked for " + durationString.humanize() + " so far."
      vtmsNotifier.notify(notification);
    });
  }
});