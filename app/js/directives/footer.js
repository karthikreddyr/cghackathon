angular.module('myApp')
.directive('footer', myFooter);

function myFooter() {
var directive = {
   restrict: 'E',
   templateUrl: 'js/directives/footer.html'
};
return directive;
}
