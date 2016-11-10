angular.module('TPInmobiliaria.controladorUsuario', [])

app.controller('ControlUsuarios', function($scope, $http, $state) {


});

app.controller('ControlAccesoUsuarios', function($scope, $http, $state, $auth, ServicioUsuario) {
	$scope.usuario={};
	$scope.usuario.nombre = "Horacio";
	$scope.usuario.apellido = "Dillon";
	$scope.usuario.telefono = 42273011;
	$scope.usuario.email = "h@gmail.com";
	$scope.usuario.password = "123456";
	$scope.usuario.foto = "foto.jpg";
	$scope.usuario.perfil = "cliente";
	$scope.usuario.estado = "activo";
	$scope.usuario.password2 = "123456";

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
	    ServicioUsuario.altaPersona($scope.usuario).then(
	      function(respuesta){
	        console.info("RESPUESTA (ctrl alta usuario): ", respuesta);
	      },
	      function(error){
	        console.info("ERROR! (ctrl alta usuario): ", error);
	      }
	    );
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


