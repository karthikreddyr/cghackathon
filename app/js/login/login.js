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
    $http.get("/json/login.txt")
      .then(function (response) {
        $scope.serverUserName = response.data.username;
        $scope.serverPassword = response.data.password;
        $scope.serverbankname = response.data.bankname;
        $scope.serveraccountnumber = response.data.accountnumber;
      });
    $scope.submitLogin = function () {

      if ($scope.username.toUpperCase() === $scope.serverUserName.toUpperCase() && $scope.password === $scope.serverPassword) {
        localStorage.setItem("username", $scope.serverUserName);
        localStorage.setItem("bankname", $scope.serverbankname);
        localStorage.setItem("accountnumber", $scope.serveraccountnumber);
       $location.path('dashboard');

      }
      else{
        $scope.invalidDetails = true;
      }
    }
  }]);