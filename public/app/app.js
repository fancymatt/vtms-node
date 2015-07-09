angular.module('vtms', ['ngResource', 'ngRoute', 'xeditable', 'ui.bootstrap']);

angular.module('vtms').run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

angular.module('vtms').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(vtmsAuth) {
      return vtmsAuth.authorizeCurrentUserForRoute('admin')
      }},
    user: {auth: function(vtmsAuth) {
      return vtmsAuth.authorizeAuthenticatedUserForRoute()
      }},
    teamMember: {auth: function(vtmsAuth) {
      return vtmsAuth.authorizeCurrentUserIsTeamMember();
      }}
    }
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { 
      templateUrl: '/partials/main/main', 
      controller: 'vtmsMainController'
    })
    .when('/admin/users', { 
      templateUrl: '/partials/admin/user-list', 
      controller: 'vtmsUserListController',
      resolve: routeRoleChecks.admin
    })
    .when('/signup', { 
      templateUrl: '/partials/account/signup', 
      controller: 'vtmsSignupController' 
    })
    .when('/profile', { 
      templateUrl: '/partials/account/profile', 
      controller: 'vtmsProfileController', 
      resolve: routeRoleChecks.user
    })
    .when('/shifts', { 
      templateUrl: '/partials/shift/recent-shifts', 
      controller: 'vtmsRecentShiftsController'
    })
    .when('/series', { 
      templateUrl: '/partials/series/series-list', 
      controller: 'vtmsSeriesListController'
    })
    .when('/series/:id', { 
      templateUrl: '/partials/series/series-details', 
      controller: 'vtmsSeriesDetailController'
    })
    .when('/languageSeries/:id', { 
      templateUrl: '/partials/languageSeries/language-series-details', 
      controller: 'vtmsLanguageSeriesDetailController'
    })
    .when('/teamMembers', {
      templateUrl: '/partials/teamMembers/team-member-list',
      controller: 'vtmsTeamMemberListController'
    })
    .when('/teamMembers/:id', {
      templateUrl: '/partials/teamMembers/team-member-details',
      controller: 'vtmsTeamMemberDetailsController'
    })
    .when('/lesson/:id', {
      templateUrl: '/partials/lessons/lesson-details',
      controller: 'vtmsLessonDetailsController'
    })
    .when('/tasklist', {
      templateUrl: '/partials/task/team-member-task-list',
      controller: 'vtmsTeamMemberTaskListController',
      resolve: routeRoleChecks.teamMember
    })
    .when('/publishing', {
      templateUrl: '/partials/publishDates/publish-date-list',
      controller: 'vtmsPublishDateListController',
      resolve: routeRoleChecks.admin
    });
});

angular.module('vtms').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  });
});