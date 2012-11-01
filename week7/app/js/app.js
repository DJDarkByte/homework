'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/klant', {templateUrl: 'partials/klant.html', controller: TableCtrl});
    $routeProvider.when('/medewerker', {templateUrl: 'partials/medewerker.html', controller: TableCtrl});
    $routeProvider.otherwise({redirectTo: '/klant'});
  }]);
