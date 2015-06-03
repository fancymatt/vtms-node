angular.module('vtms', ['ngResource', 'ngRoute']);

angular.module('vtms').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', { templateUrl: '/partials/main/main', controller: 'vtmsMainController'});
});