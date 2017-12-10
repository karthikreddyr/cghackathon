'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'js/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', '$http','$location','$uibModal',function($scope,  $http, $location, $uibModal) {
  if (localStorage.getItem("username")) {
   
   $location.path('dashboard');

  }
  else
  {
    $location.path('login');
  }
  $http.get("/json/loanstatus.json")
  .then(function (response) {
   
    $scope.items = response.data;
  });
$scope.openLoan = function(){

  $uibModal.open({
    templateUrl: '../js/modals/loanpopup.html',
    controller: function ($scope, $uibModalInstance) {

      $scope.otpHide = true;
      $scope.loanError = false;

      $scope.generateOtp = function(){
  if($scope.chooseBank==undefined || $scope.accountNumber==undefined){
     $scope.loanError = true;
  }
  else{

        $scope.otpHide = false;
  }
      };

      $scope.successOTP = function(){
        $uibModalInstance.dismiss('cancel');
        
       $location.path('myaccount');
      };


      $scope.close = function () {
        $uibModalInstance.close();
      };
    
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  })

   
    };




  $scope.clicked = function(){
          $location.path('myaccount');
      }
    }])

    .controller('LoanPopupCtrl', function ($scope, $uibModalInstance) {



      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        };


        })