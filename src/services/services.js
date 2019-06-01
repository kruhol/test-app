'use strict';
var angular = require('angular');

angular.module('services', [])
    .service('FormSvc', ['$http', function($http) {
        var self = angular.extend(this, {
            getEvailableForms: getEvailableForms
        })

        function getEvailableForms() {
            return $http.get('availableforms');
        }
    }])