'use strict';

angular.module('myApp.login', ['ngRoute', 'ui.router'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'js/login/login.html',
      controller: 'LoginCtrl'
    });
  }])
  

  .controller('LoginCtrl', ['$scope', '$state', '$location', '$http', function ($scope, $state, $location, $http) {
    

    $scope.invalidDetails = false;
    if (localStorage.getItem("username")) {
      
      $location.path('dashboard');
   
     }
     else
     {
       $location.path('login');
     }
    $http.get("/json/login.json")
      .then(function (response) {
        $scope.serverUserName = response.data.username;
        $scope.serverPassword = response.data.password;
      });
    $scope.submitLogin = function () {

      if ($scope.username === $scope.serverUserName && $scope.password === $scope.serverPassword) {
        localStorage.setItem("username", $scope.username);
       $location.path('dashboard');

      }
      else{
        $scope.invalidDetails = true;
      }
    }
  }]);