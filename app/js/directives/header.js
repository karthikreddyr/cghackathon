angular.module('myApp')
.directive('header', myHeader);

function myHeader() {
var directive = {
   restrict: 'E',
   templateUrl: 'js/directives/header.html',
   controller: function ($scope, $location) {
    $scope.username = localStorage.getItem('username');
    $scope.logout = function(){
        localStorage.removeItem('username');
        
      $location.path('login');
    };
  }
};
return directive;
}
