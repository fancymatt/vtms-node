angular.module('vtms').controller('vtmsUnassignedTasksController', function($scope, vtmsTask) {

  $scope.unassignedTasksConfig = {
    title: 'Unassigned Tasks',
    type: 'unassignedTasks',
    update: function() {
      return vtmsTask.getActionableTasksForMember({id: 5});
    },
    actions: {
      activate: false,
      deactivate: false,
      complete: true,
      reassign: true,
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

});
