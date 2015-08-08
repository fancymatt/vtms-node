angular.module('vtms').controller('vtmsTeamMemberTaskListController', function($rootScope, vtmsTeamMember, vtmsTask, vtmsLesson, vtmsIdentity, vtmsNotifier, vtmsIssue, vtmsActivity) {
  var ctrl = this;
  
  ctrl.identity = vtmsIdentity.currentUser;
  ctrl.userId = ctrl.identity.fkTeamMember;
  ctrl.teamMember = vtmsTeamMember.get({id: ctrl.identity.fkTeamMember});
  ctrl.actionableTasks = vtmsTask.getActionableTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.activeTasks = vtmsTask.getActiveTasksForMember({id: ctrl.identity.fkTeamMember});
  ctrl.issueList = vtmsLesson.getLessonsWithIssuesForMember({id: ctrl.identity.fkTeamMember});
  ctrl.activityList = vtmsActivity.getRecentListForTeamMember({id: ctrl.identity.fkTeamMember});
  
  ctrl.updateActivityList = function() {
    return vtmsActivity.getRecentListForTeamMember({id: ctrl.identity.fkTeamMember});
  };
  
  ctrl.updateIssues = function() {
    ctrl.activityList = vtmsActivity.getRecentListForTeamMember({id: ctrl.identity.fkTeamMember});
  };
  
  ctrl.beginFixingIssues = function(task) {
    console.log('task', task);
    // create a new activity
    $rootScope.$broadcast('activity:toBeAdded');
    var newActivity = new vtmsActivity();
    newActivity.createActivityForIssues(task).then(function(activity) {
      $rootScope.$broadcast('activity:created', activity);
    });   
    
    // allow using the buttons on the underlying task
    ctrl.issuesConfig.taskBeingFixed = task.id;
  };
    
  ctrl.actionableTasksConfig = {
    title: 'Your Tasks',
    type : 'actionable',
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

  ctrl.issuesConfig = {
    taskBeingFixed: 0,
    actions: {
      complete: true,
      delete: false,
      reassign: false,
      getTime: false
    },
    columns: {
      actions: false,
      lesson: false,
      task: false,
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