'use strict';

angular.module('pgoPokeSalchichasApp', ['pgoPokeSalchichasApp.auth', 'pgoPokeSalchichasApp.admin',
    'pgoPokeSalchichasApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
