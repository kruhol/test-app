'use strict';

// angular
var angular = require('angular');
require('@uirouter/angularjs');
require('ngstorage');

// bootstrap and deps
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('font-awesome/css/font-awesome.css')

// util
function importAll(r) {
  r.keys().forEach(r);
}

// begin module
angular.module('app', ['ui.router', 'ngStorage']);

// app deps
require('./constants.js');

// function addAuthGuard($rootScope, $location, $sessionStorage){
//   // redirect to login page if not logged in and trying to access a restricted page
//   $rootScope.$on('$locationChangeStart', function (event, next, current) {
//     // if ( $location.path() != '/login' && !$sessionStorage.user ) {
//     //   $location.path('/login');
//     // }

//     $location.path('/home');
//   });
// }

function defaultRoute($urlRouterProvider){
  $urlRouterProvider.otherwise('/home')
}


// services
importAll(require.context('./services', false, /\.js$/));

// filters
importAll(require.context('./filters', false, /\.js$/));

// directives
importAll(require.context('./directives', false, /\.js$/))

// routers
// importAll(require.context('./login', false, /.js$/))
importAll(require.context('./home', true, /.js$/))

angular.module('app')
  .config(['$urlRouterProvider', defaultRoute])
  // .run(['$rootScope', '$location', '$sessionStorage', addAuthGuard])
/*
// https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
// debugging
angular.module('app').run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
*/

module.exports = angular.module('app');
// load index
require('./index.html')
console.log('app Ready')




