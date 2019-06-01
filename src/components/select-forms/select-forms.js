var angular = require('angular');

angular.module('components')
  .component('selectForms', {
    bindings: {
      ngModel: '<',
      forms: '<'
    },
    controller: ['$scope', appSelectCtrl],
    controllerAs: '$ctrl',
    templateUrl: require('./select-forms.html')
  })

function appSelectCtrl($scope) {
  var self = angular.extend(this, {
    addItem: addItem,
    removeItem: removeItem,
    $onInit: $onInit
  })

  function $onInit() {
    self.forms.forEach(f => {
      if (f.required) {
        self.ngModel.push(f);
        self.forms.splice(self.forms.indexOf(f), 1);
      }
    })
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
