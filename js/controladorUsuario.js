angular.module('TPInmobiliaria.controladorUsuario', [])

app.controller('ControlUsuarios', function($scope, $http, $state) {


});

app.controller('ControlAccesoUsuarios', function($scope, $http, $state, Usuario) {
	$scope.usuario={};
	$scope.usuario.nombre;
	$scope.usuario.apellido;
	$scope.usuario.telefono;
	$scope.usuario.email;
	$scope.usuario.password;
	$scope.usuario.password2;

	$scope.Login = function(){
		console.info("user", $scope.usuario);

		Usuario.setEmail($scope.usuario.email);
		Usuario.setPassword($scope.usuario.password);
		Usuario.setEstaLogueado(true);
	}

	$scope.Registrarse = function(){
		console.info("user", $scope.usuario);
	}


})


