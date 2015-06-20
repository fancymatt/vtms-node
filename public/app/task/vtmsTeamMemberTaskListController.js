angular.module('vtms').controller('vtmsTeamMemberTaskListController', function($scope, vtmsTeamMember, vtmsTask, vtmsIdentity, $routeParams, $location, vtmsNotifier) {
  
  $scope.identity = vtmsIdentity.currentUser;
  $scope.teamMember = vtmsTeamMember.get({id: $scope.identity.fkTeamMember});
  $scope.actionableTasks = vtmsTask.getActionableTasksForMember({id: $scope.identity.fkTeamMember});
  $scope.activeTasks = vtmsTask.getActiveTasksForMember({id: $scope.identity.fkTeamMember});
  
  $scope.sortOptions = [
    {value: "dueDate()", text: "Sort by Due Date"},
    {value: "taskGlobal.name", text: "Sort by Task Type"}
  ];
  
  $scope.selectedSortOption = $scope.sortOptions[0].value;
  
  $scope.activateTask = function(task) {
    task.activate().then(function(newData) {
      angular.extend(task, newData);
      $scope.activeTasks.push(task);
      var indexToDelete = $scope.actionableTasks.indexOf(task);
      $scope.actionableTasks.splice(indexToDelete, 1);
      
      var lessonString = task.lesson.languageSery.title + " #" + task.lesson.number + " - " + task.taskGlobal.name;
      vtmsNotifier.notify("Activated " + lessonString);
    });
  }
  
  $scope.deactivateTask = function(task) {
    task.deactivate().then(function(newData) {
      var indexToDelete = $scope.activeTasks.indexOf(task);
      $scope.activeTasks.splice(indexToDelete, 1);
      angular.extend(task, newData);
      $scope.actionableTasks.push(task);
      
      var lessonString = task.lesson.languageSery.title + " #" + task.lesson.number + " - " + task.taskGlobal.name;
      var durationString = moment.duration(newData.timeRunning, 'seconds');
      vtmsNotifier.notify("Deactivated " + lessonString + ". You've worked for " + durationString.humanize() + " so far.");
    });
  }
});