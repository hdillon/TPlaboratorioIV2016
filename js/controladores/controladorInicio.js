angular.module('TPInmobiliaria.controllers', [])

app.controller('ControlInicio', function($scope, $state, $auth, jwtHelper, $http, $auth, ServicioUsuario) {
	$scope.flagLogueado = false;
	$scope.loginIncorrecto = false;
	$scope.registroIncorrecto = false;
	$scope.usuarioLogueado={};
	$scope.usuarioLogueado.nombre = "";
	$scope.usuarioLogueado.apellido = "";
	$scope.usuarioLogueado.telefono = 12345678;
	$scope.usuarioLogueado.email = "";
	$scope.usuarioLogueado.password = "";
	$scope.usuarioLogueado.foto = "foto.jpg";
	$scope.usuarioLogueado.perfil = "cliente";
	$scope.usuarioLogueado.estado = "activo";
	$scope.usuarioLogueado.password2 = "";

	if($auth.isAuthenticated()){
		$scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
	    $scope.flagLogueado = true;
	    console.info("usuarioLogueado", $scope.usuarioLogueado);
	}else{
		$scope.flagLogueado = false;
	}

	$scope.goToLogin=function(){
		$scope.loginIncorrecto = false;
		 $("#loginModal").modal('show');
		//$state.go('usuarioLogueado.login');
    }

    $scope.goToRegistrarse=function(){
    	$scope.registroIncorrecto = false;
    	$("#loginModal").modal('hide');
    	$("#registrarseModal").modal('show');
    	//$state.go('usuarioLogueado.registrarse');
    }

	$scope.Desloguear=function(){
		$auth.logout();
		$scope.flagLogueado = false;
    }

	$scope.resetErrores=function(){
		$scope.$broadcast('show-errors-reset');
    }

	$scope.Login = function(){
		$scope.$broadcast('show-errors-check-validity');
	  	if ($scope.formLogin.$invalid) { return; }//Valido que los campos estén correctos antes de intentar loguear
		$("#loadingModal").modal('show');//Bloqueo la pantalla con un loading hasta que vuelva la respuesta del servidor
		console.info("user", $scope.usuarioLogueado);
	    $auth.login($scope.usuarioLogueado)
	    .then(function(response) {
	        console.info("correcto", response);
	        if($auth.isAuthenticated()){
	        	$("#loadingModal").modal('hide');
	          console.info("token", $auth.getPayload());
	          $("#loginModal").modal('hide');
	      	  $state.reload();//Si se logueó correctamente recargo la pantalla de inicio para actualizar el nav-bar
	      	}
	        else{
	          console.info("no token", $auth.getPayload());
	          $("#loadingModal").modal('hide');
	          $scope.loginIncorrecto = true;
	        }
	    })
	    .catch(function(response) {
	        console.info("incorrecto", response);
	        $("#loadingModal").modal('hide');
	        $scope.loginIncorrecto = true;
	    });
  	}

	$scope.Registrarse = function(){
		$scope.$broadcast('show-errors-check-validity');
	  	if ($scope.formRegistrarse.$invalid) { return; }//Valido que los campos estén correctos antes de intentar loguear
		$("#loadingModal").modal('show');//Bloqueo la pantalla con un loading hasta que vuelva la respuesta del servidor
	    ServiciousuarioLogueado.altaPersona($scope.usuarioLogueado).then(
	      function(respuesta){
	        console.info("RESPUESTA (ctrl alta usuarioLogueado): ", respuesta);
	        $("#loadingModal").modal('hide');//si el registro fué exitoso oculto el formulario para regresar al inicio
	        $("#registrarseModal").modal('hide');
	      },
	      function(error){
	        console.info("ERROR! (ctrl alta usuarioLogueado): ", error);
	        $("#loadingModal").modal('hide');
	        $scope.registroIncorrecto = true;
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

  $scope.DatosAdmin=function(){
	$scope.usuarioLogueado.email = "admin@gmail.com";
	$scope.usuarioLogueado.password = "admin";
  }

  $scope.DatosEncargado=function(){
	$scope.usuarioLogueado.email = "encargado@gmail.com";
	$scope.usuarioLogueado.password = "123456";
  }

  $scope.DatosEmpleado=function(){
  	$scope.usuarioLogueado.email = "empleado@gmail.com";
	$scope.usuarioLogueado.password = "123456";
  }

  $scope.DatosCliente=function(){
  	$scope.usuarioLogueado.email = "cliente@gmail.com";
	$scope.usuarioLogueado.password = "123456";
  }


});

