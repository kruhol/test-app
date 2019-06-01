'use strict';

var angular = require('angular');

require('../css/home.css')

function homeCtrl(availableForms) {
  angular.extend(this, {
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

const homeCtrlConfig = [
  'availableForms',
  homeCtrl
];

function routeConfig($stateProvider) {
  $stateProvider.state(stateConfig)
}

angular.module('home', ['components', 'services'])
  .controller('homeCtrl', homeCtrlConfig)
  .config(['$stateProvider', routeConfig]);

module.exports = stateConfig;