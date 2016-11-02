angular.module('TPInmobiliaria.controladorUsuario', [])

app.controller('ControlUsuarios', function($scope, $http, $state) {


});

app.controller('ControlAccesoUsuarios', function($scope, $http, $state) {
	$scope.usuario={};
	$scope.usuario.nombre;
	$scope.usuario.apellido;
	$scope.usuario.telefono;
	$scope.usuario.email;
	$scope.usuario.password;
	$scope.usuario.password2;

	$scope.Login = function(){
		console.info("user", $scope.usuario);
	}
	
	$scope.Registrarse = function(){
		console.info("user", $scope.usuario);
	}


})


