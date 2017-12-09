'use strict';

angular.module('myApp.myaccount', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myaccount', {
    templateUrl: 'js/myaccount/myaccount.html',
    controller: 'MyaccountCtrl'
  });
}])

.controller('MyaccountCtrl', ['$scope', '$location',function($scope, $location) {
  
  $scope.clicked = function(){   
  
      $location.path('dashboard');
  }
    }]);