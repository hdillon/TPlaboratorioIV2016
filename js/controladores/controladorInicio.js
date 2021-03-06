angular.module('TPInmobiliaria.controllers', [])

app.controller('ControlInicio', function($scope, $state, $stateParams, $auth, jwtHelper, $http, $auth, ServicioABM, $window) {
	$scope.flagLogueado = false;
	$scope.loginIncorrecto = false;
	$scope.registroIncorrecto = false;
	$scope.usuarioLogueado={};

	if($auth.isAuthenticated()){
		$scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
	    $scope.flagLogueado = true;
	    console.info("usuarioLogueado", $scope.usuarioLogueado);
	}else{
		console.log("USUARIO NO LOGUEADO INICIO");
		$scope.flagLogueado = false;
		console.info("session Agotada: ", $stateParams.sesionagotada);
		$scope.usuarioLogueado={};
		if($stateParams.sesionagotada != "" && $stateParams.sesionagotada != undefined){
			$("#modalSesionAgotada").modal();
		}
	}

	$scope.goToLogin=function(){
		$scope.usuarioLogueado={};
		$scope.loginIncorrecto = false;
		$window.scrollTo(0, 0);
		 $("#loginModal").modal('show');
		//$state.go('usuarioLogueado.login');
    }

    $scope.goToRegistrarse=function(){
    	$scope.usuarioLogueado={};
    	$scope.usuarioLogueado.perfil="cliente";
    	$scope.usuarioLogueado.estado="activo";
    	$scope.registroIncorrecto = false;
    	$("#loginModal").modal('hide');
    	$("#registrarseModal").modal('show');
    	//$state.go('usuarioLogueado.registrarse');
    }

    $scope.IrAlMenuInicio=function(){
		$state.go("inicio.menuinicio");
    }

	$scope.Desloguear=function(){
		$auth.logout();
		$scope.flagLogueado = false;
		$state.go("inicio.home");
		//$state.reload();
    }

	$scope.resetErrores=function(){
		$scope.$broadcast('show-errors-reset');
    }

	$scope.reload = function(){
		//Limpio el parametro sesionagotada para que no me vuelva a mostrar el dialogo cuando se cargue la página de inicio
		$state.go("inicio.home", {sesionagotada : ""}, {reload: true});
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
	          $scope.GuardarFechaLogin($auth.getPayload());
	          $state.go("inicio.menuinicio", {sesionagotada : ""}, {reload: true});
	      	  //$state.reload();//Si se logueó correctamente recargo la pantalla de inicio para actualizar el nav-bar
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
	    ServicioABM.guardar("persona/alta/", $scope.usuarioLogueado).then(
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

	$scope.GuardarFechaLogin = function(usuario){
	     ServicioABM.guardar("fechalogin/", usuario).then(
	      function(respuesta){
	        console.info("RESPUESTA (ctrl alta fechalogin): ", respuesta);
	      },
	      function(error){
	        console.info("ERROR! (ctrl alta fechalogin): ", error);
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

  $scope.openNav=function(){
    document.getElementById("myNav").style.width = "100%";
  }

  $scope.closeNav=function(){
    document.getElementById("myNav").style.width = "0%";
  }

  $scope.MostrarTodasLasOfertas=function(){
	$state.go("inicio.catalogo");
  }

  $scope.MostrarMisReservas=function(){
	$state.go("inicio.misreservas");
  }

  $scope.NuestrasScursales=function(){
	$state.go("inicio.nuestrassucursales");
  }

});

