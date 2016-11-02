angular.module('TPInmobiliaria.controllers', [])


app.controller('ControlInicio', function($scope, $http, $state, Usuario) {
    $scope.usuario={};
	$scope.usuario.nombre;
	$scope.usuario.apellido;
	$scope.usuario.telefono;
	$scope.usuario.email;
	$scope.usuario.password;


  $scope.Login = function(){
    $state.go("usuario.login");
  }

})

app.controller('ControlUsuario', function($scope, $http, $state) {

});


