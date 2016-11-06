angular.module('TPInmobiliaria.controladorUsuario', [])

app.controller('ControlUsuarios', function($scope, $http, $state) {


});

app.controller('ControlAccesoUsuarios', function($scope, $http, $state, $auth) {
	$scope.usuario={};
	$scope.usuario.nombre;
	$scope.usuario.apellido;
	$scope.usuario.telefono;
	$scope.usuario.email;
	$scope.usuario.password;
	$scope.usuario.password2;

	$scope.Login = function(){
		console.info("user", $scope.usuario);
	    $auth.login($scope.usuario)
	    .then(function(response) {
	        console.info("correcto", response);
	        if($auth.isAuthenticated()){
	          console.info("token", $auth.getPayload());
	      	  $state.go('inicio');
	      	}
	        else
	          console.info("no token", $auth.getPayload());
	    })
	    .catch(function(response) {
	        console.info("incorrecto", response);
	    });
  	}

	$scope.Registrarse = function(){
		console.info("user", $scope.usuario);
	}

	$scope.Traer=function(){
    $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/personas')
    .then(function(respuesta) {       
      console.info("RESPUESTA", respuesta);
           $scope.ListadoPersonas = respuesta.data;
           console.log(respuesta.data);
      },function errorCallback(response) {
           $scope.ListadoPersonas= [];
          console.log( response); 
     });
  }


})


