'use strict';
var angular = require('angular');

require('../css/home.css')

function homeCtrl(availableForms) {
  var self = angular.extend(this, {
    title: 'Test App',
    availableForms: availableForms,
    selectedForms: []
  });
}

var stateConfig = {
  name: 'home',
  url: '/home',
  templateUrl: require('./home.html'),
  controller: 'homeCtrl',
  controllerAs: '$ctrl',
  resolve: {
    availableForms: ['FormSvc', function(FormSvc) {
      return FormSvc.getEvailableForms();
    }]
  }
};

homeCtrl.$inject = [
]

function routeConfig($stateProvider) {
  $stateProvider.state(stateConfig)
}

angular.module('home', ['components', 'services'])
  .controller('homeCtrl', ['availableForms', homeCtrl])
  .config([ '$stateProvider', routeConfig ])

module.exports = stateConfig;