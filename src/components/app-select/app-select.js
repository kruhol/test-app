'use strict'

var angular = require('angular');

const appSelectConfig = {
  bindings: {
    selectedItem: '<',
    isUsed: '<?',
    forms: '<',
    addItem: '&',
    removeItem: '&'
  },
  controller: appSelectCtrl,
  controllerAs: '$ctrl',
  templateUrl: require('./app-select.html')
};

function appSelectCtrl() {
  var self = angular.extend(this, {
    onClick: onClick,
    skeep: skeep
  });

  function onClick(item) {
    self.selectedItem = item;
  }

  function skeep(){
    self.selectedItem = null;
  }
}

angular.module('components')
  .component('appSelect', appSelectConfig);
