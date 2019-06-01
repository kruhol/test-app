// 'use strict'
var angular = require('angular');

angular.module('components')
  .component('appSelect', {
    bindings: {
      selectedItem: '<',
      isUsed: '<?',
      forms: '<',
      addItem: '&',
      removeItem: '&'
    },
    controller: ['$scope', appSelectCtrl],
    controllerAs: '$ctrl',
    templateUrl: require('./app-select.html')
  })

function appSelectCtrl($scope) {
  var self = angular.extend(this, {
    onClick: onClick,
    skeep: skeep
  })

  function onClick(item) {
    self.selectedItem = item;
  }

  function skeep(){
    self.selectedItem = null;
  }
}
