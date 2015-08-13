angular.module('vtms').controller('vtmsUndeliveredAssetsController', function($scope, vtmsTask) {
  
  $scope.undeliveredTasksConfig = {
    title: 'Your Undelivered Assets',
    type: 'undeliveredAssets',
    update: function() {
      return vtmsTask.getUndeliveredTasks();
    },
    actions: {
      activate: true,
      deactivate: true,
      complete: false,
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
  
});