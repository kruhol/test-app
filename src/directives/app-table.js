'use strict';
function appTable(){
  return {
    restrict: 'A',
    scope: {
      rows: '=data'
    },
    templateUrl: require('./app-table.html'),
    link: function(scope, element, attrs, controller, transcludeFn){
      var unwatch = scope.$watch('rows', (nv, ov) => {
        if ( !!nv ) {
          unwatch();
          launch();
        }
      })
      function launch() {
        scope.headers = scope.rows.shift();
        console.log(scope.headers, scope.rows)
      }
    }
  }
}

angular.module('app')
  .directive('appTable', appTable)

module.exports = {
  name: 'appTable',
  directive: appTable
}

