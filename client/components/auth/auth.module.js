'use strict';

angular.module('pgoPokeSalchichasApp.auth', ['pgoPokeSalchichasApp.constants',
    'pgoPokeSalchichasApp.util', 'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
