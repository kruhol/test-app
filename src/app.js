'use strict';

// angular
var angular = require('angular');
require('@uirouter/angularjs');
require('ngstorage');

// bootstrap and deps
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('font-awesome/css/font-awesome.css');

// util
function importAll(r) {
  r.keys().forEach(r);
}

function importAllFolders(r) {
  r.keys()
    .sort(function(a, b) {
      return a.length - b.length;
    })
    .forEach(r);
}

// begin module
angular.module('app', ['ui.router', 'ngStorage', 'home']);

function defaultRoute($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
}

// services
importAll(require.context('./services', false, /\.js$/));

// components
importAllFolders(require.context('./components', true, /.js$/));

// routers
importAll(require.context('./home', true, /.js$/));

angular.module('app')
  .config(['$urlRouterProvider', defaultRoute]);

module.exports = angular.module('app');
// load index
require('./index.html');
