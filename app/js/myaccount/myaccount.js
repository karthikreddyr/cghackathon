'use strict';

angular.module('myApp.myaccount', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/myaccount', {
      templateUrl: 'js/myaccount/myaccount.html',
      controller: 'MyaccountCtrl'
    });
  }])

  .controller('MyaccountCtrl', ['$scope', '$location', '$http', '$uibModal', function ($scope, $location, $http, $uibModal) {
    if (!localStorage.getItem("username")) {

      $location.path('login');

    }

    $http.get("/json/myaccount.json")
      .then(function (response) {

        $scope.currentbalance = response.data.currentbalance;
        $scope.monthlyBlanace = response.data.monthlyBlanace;
        $scope.eligibleLoanAmount = response.data.eligibleLoanAmount;
      });

    $scope.loanConfirm = function () {


      $uibModal.open({
        templateUrl: '../js/modals/loanConfirmation.html',
        controller: function ($scope, $uibModalInstance) {

          // Inner modal 

          $scope.submitConfirm = function () {

            $uibModalInstance.dismiss('cancel');
            $uibModal.open({
              templateUrl: '../js/modals/loanSuccess.html',
              controller: function ($scope, $uibModalInstance) {

                $scope.requestAmountError = false;

               


                $scope.close = function () {
                  $uibModalInstance.close();
                };

                $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
                };
              }
            })


          };

          $scope.otpHide = true;

          $scope.generateOtp = function () {
            $scope.otpHide = false;
          };

          $scope.successOTP = function () {
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

    $scope.clicked = function () {

      $location.path('dashboard');
    }
  }]);