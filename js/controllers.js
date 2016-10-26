angular.module('TPInmobiliaria.controllers', [])


app.controller('ControlInicio', function($scope, $http, $state) {
  //console.log($(".navbar").offset().top);
  $scope.Login = function(){
    $state.go("usuario.login");
  }

})

app.controller('ControlUsuario', function($scope, $http, $state) {

});


