'use strict';
var angular = require('angular');

function FormSvc($http) {
  angular.extend(this, {
    getEvailableForms: getEvailableForms
  })

  function getEvailableForms() {
    return $http.get('availableforms.json')
      .then(res => res.data)
  }
}

const formSvcConfig = [
  '$http',
  FormSvc
]

angular.module('services', [])
  .service('FormSvc', formSvcConfig);
