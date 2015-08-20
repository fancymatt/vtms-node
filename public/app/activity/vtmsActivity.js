angular.module('vtms').factory('vtmsActivity', function($resource, $q, $rootScope) {
  var ActivityResource = $resource('/api/activities/:id', {id: '@id'}, {
    update: {method:'PUT', isArray:false},
    getListForTeamMember: {method:'GET', url: '/api/teamMembers/:id/activities', isArray: true},
    getRecentListForTeamMember: {method:'GET', url: '/api/teamMembers/:id/activities/recent', isArray: true},
    getActiveActivityForTeamMember: {method:'GET', url: '/api/teamMembers/:id/activities/active'},
    getListForLesson: {method:'GET', url: '/api/lessons/:id/activities', isArray: true},
    getActiveList: {method:'GET', url: '/api/activities/active', isArray: true},
    getRecentList: {method:'GET', url: '/api/activities/recent', isArray: true}
  });

  ActivityResource.prototype.duration = function() {
    if(this.timeStart && this.timeEnd) {
      var start = moment(this.timeStart);
      var end = moment(this.timeEnd);
      return moment.duration(end.diff(start)).humanize();
    } else {
      return false;
    }
  };

  ActivityResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    this.$update(newData)
    .then(function() {
      dfd.resolve(newData);
    })
    .catch(function(response) {
      dfd.reject('You don\'t have permission to edit.');
    });
    return dfd.promise;
  };

  ActivityResource.prototype.delete = function() {
    var dfd = $q.defer();
    this.$delete()
    .then(function() {
      dfd.resolve();
    })
    .catch(function(response) {
      dfd.reject('You don\'t have permission to delete.');
    });
    return dfd.promise;
  };

  ActivityResource.prototype.deactivateActiveActivitiesForMember = function(teamMemberId) {
    var dfd = $q.defer();
    this.$getActiveActivityForTeamMember({id: teamMemberId})
    .then(function(activity) {
      if(activity.activity) {
        activity.deactivate();
      }
      dfd.resolve();
    })
    .catch(function(err) {
      console.error("An error was returned from ActivityResource.prototype.deactivateActiveActivitiesForMember");
      console.error(err);
    });
    return dfd.promise;
  };

  ActivityResource.prototype.deactivate = function() {
    var dfd = $q.defer();
    var newData = {}
    newData.timeEnd = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    newData.isActive = false;

    if(this.fkTask > 0) {
      if(this.activity === 'Fixing issues') {
        newData.activity = 'Fixed issues';
      } else if (this.activity === 'Working on task') {
        newData.activity = 'Worked on task';
      } else {
        newData.activity = 'Completed task';
      }
    }

    this.$update(newData)
    .then(function(newData) {
      $rootScope.$broadcast('activity:deactivated', this);
      dfd.resolve(newData);
    })
    .catch(function(err) {
      console.error("An error was returned from ActivityResource.prototype.deactivate");
      console.error(err);
    });

    return dfd.promise;
  };

  ActivityResource.prototype.complete = function() {
    if(this.activity === 'Working on task') {
      this.activity = 'Completed task';
    }
    this.deactivate();
  };


  ActivityResource.prototype.cleanAndCreate = function(activity, teamMemberId, task) {
    this.deactivateActiveActivitiesForMember(teamMemberId).then(function() {
      var newActivity = new ActivityResource;
      newActivity.createActivity(activity, teamMemberId, task);
    });
  };

  ActivityResource.prototype.createActivity = function(activity, teamMemberId, task) {
    var dfd = $q.defer();

    this.timeStart = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.fkTeamMember = teamMemberId;
    this.isActive = true;

    if(activity === 'taskActivated') {
      this.fkTask = task.id;
      this.activity = 'Working on task';

    } else if(activity === 'issuesForTask') {
      this.fkTask = task.id;
      this.activity = 'Fixing issues';

    } else {
      this.activity = activity;
    }
    this.$save()
    .then(function(activity) {
      $rootScope.$broadcast('activity:created', activity);
      dfd.resolve(activity);
    })
    .catch(function(err) {
      console.error("An error was returned from ActivityResource.prototype.createActivity");
      console.error(err);
    });

    return dfd.promise;
  };

  ActivityResource.prototype.createActivityForTask = function(task) {
    this.cleanAndCreate('taskActivated', task.fkTeamMember, task);
  };

  ActivityResource.prototype.createActivityForIssues = function(task) {
    this.cleanAndCreate('issuesForTask', task.fkTeamMember, task);
  };

  return ActivityResource;
});

