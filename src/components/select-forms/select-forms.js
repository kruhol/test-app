'use strict';

var angular = require('angular');

const selectFormsConfig = {
  bindings: {
    ngModel: '<',
    forms: '<'
  },
  controller: appSelectCtrl,
  controllerAs: '$ctrl',
  templateUrl: require('./select-forms.html')
};

function appSelectCtrl() {
  var self = angular.extend(this, {
    addItem: addItem,
    removeItem: removeItem,
    $onInit: $onInit
  });

  function $onInit() {
    let requiredForms = self.forms.filter(f => f.required);

    requiredForms.forEach(f => {
      self.ngModel.push(f);
      self.forms.splice(self.forms.indexOf(f), 1);
    });
  }

  function addItem(item) {
    self.ngModel.push(item);
    self.forms.splice(self.forms.indexOf(item), 1);
  }

  function removeItem(item) {
    self.forms.push(item);
    self.ngModel.splice(self.ngModel.indexOf(item), 1);
  }
}

angular.module('components')
  .component('selectForms', selectFormsConfig);
