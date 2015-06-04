angular.module('vtms', ['ngResource', 'ngRoute']);

angular.module('vtms').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(vtmsAuth) {
      return vtmsAuth.authorizeCurrentUserForRoute('admin')
      }},
    user: {auth: function(vtmsAuth) {
      return vtmsAuth.authorizeAuthenticatedUserForRoute()
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
      controller: 'vtmsProfileController', resolve: routeRoleChecks.user
    });
});

angular.module('vtms').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  });
});