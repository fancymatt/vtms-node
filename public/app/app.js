angular.module('vtms', [
  'ngResource',
  'ngRoute',
  'xeditable',
  'ui.bootstrap',
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls'
]);

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
      controller: 'vtmsMainController',
      controllerAs: 'ctrl'
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
      controller: 'vtmsRecentShiftsController',
      resolve: routeRoleChecks.user
    })
    .when('/series', {
      templateUrl: '/partials/series/series-list',
      controller: 'vtmsSeriesListController'
    })
    .when('/series/:id', {
      templateUrl: '/partials/series/series-details',
      controller: 'vtmsSeriesDetailController'
    })
    .when('/language-series/:id', {
      templateUrl: '/partials/languageSeries/language-series-details',
      controller: 'vtmsLanguageSeriesDetailController'
    })
    .when('/team-members', {
      templateUrl: '/partials/teamMembers/team-member-list',
      controller: 'vtmsTeamMemberListController'
    })
    .when('/team-members/:id', {
      templateUrl: '/partials/teamMembers/team-member-details',
      controller: 'vtmsTeamMemberDetailsController',
      controllerAs: 'ctrl',
      resolve: routeRoleChecks.user
    })
    .when('/activity-feed', {
      templateUrl: '/partials/activity/activity-feed',
      controller: 'vtmsActivityFeedController',
      resolve: routeRoleChecks.user
    })
    .when('/lesson/:id', {
      templateUrl: '/partials/lessons/lesson-details',
      controller: 'vtmsLessonDetailsController',
      controllerAs: 'ctrl'
    })
    .when('/tasklist', {
      templateUrl: '/partials/task/team-member-task-list',
      controller: 'vtmsTeamMemberTaskListController',
      controllerAs: 'ctrl',
      resolve: routeRoleChecks.teamMember
    })
    .when('/publishing-delivered', {
      templateUrl: '/partials/publishDates/publishing-delivered',
      controller: 'vtmsPublishingDeliveredController',
      resolve: routeRoleChecks.user
    })
    .when('/undelivered-assets', {
      templateUrl: '/partials/task/undelivered-assets',
      controller: 'vtmsUndeliveredAssetsController'
    })
    .when('/publishing-upcoming', {
      templateUrl: '/partials/publishDates/publishingUpcoming',
      controller: 'vtmsPublishingUpcomingController',
      resolve: routeRoleChecks.admin
    })
    .when('/issue-assignment', {
      templateUrl: '/partials/issues/issue-assignment',
      controller: 'vtmsIssueAssignmentController',
      resolve: routeRoleChecks.admin
    })
    .when('/render-queue', {
      templateUrl: '/partials/lessons/render-queue',
      controller: 'vtmsRenderQueueController',
      resolve: routeRoleChecks.admin
    })
    .when('/database-migration', {
      templateUrl: '/partials/admin/database-migration',
      controller: 'vtmsDatabaseMigrationController',
      resolve: routeRoleChecks.admin
    })
    .when('/quality-assurance', {
      templateUrl: '/partials/lessons/quality-assurance',
      controller: 'vtmsQualityAssuranceController',
      resolve: routeRoleChecks.user
    })
    .when('/video-check-archival', {
      templateUrl: '/partials/lessons/video-check-archival',
      controller: 'vtmsVideoCheckArchivalController',
      resolve: routeRoleChecks.user
    })
    .when('/lesson/:id/checking', {
      templateUrl: '/partials/issues/checking',
      controller: 'vtmsCheckingController',
      controllerAs: 'ctrl',
      resolve: routeRoleChecks.user
  });
});

angular.module('vtms').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  });
});
