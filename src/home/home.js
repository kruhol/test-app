'use strict';
var angular = require('angular');

require('../css/home.css')

function homeCtrl(statements) {
  var self = angular.extend(this, {
    title: 'Test App',
    availableForms: [
      {
        formName: 'first',
        required: true
      }, {
        formName: 'second',
        required: false
      }, {
        formName: 'third',
        required: false
      }
    ],
    selectedForms: []
  });

  console.log(123, statements);
}

var stateConfig = {
  name: 'home',
  url: '/home',
  templateUrl: require('./home.html'),
  controller: 'homeCtrl',
  controllerAs: '$ctrl',
  resolve: {
    statements: ['$q', function($q) {
      console.log(92929292929299);
      return ['gggggggggg', 'ffffffff']
    }]
  }
};

homeCtrl.$inject = [
]

function routeConfig($stateProvider) {
  $stateProvider.state(stateConfig)
}

angular.module('home', ['components'])
  .controller('homeCtrl', ['statements', homeCtrl])
  .config([ '$stateProvider', routeConfig ])

module.exports = stateConfig;