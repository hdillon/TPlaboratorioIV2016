angular.module('TPInmobiliaria.controllers', [])

app.controller('ControlInicio', function($scope, $state, $auth, jwtHelper) {
	$scope.flagLogueado = false;

	if($auth.isAuthenticated()){
		$scope.usuario = jwtHelper.decodeToken($auth.getToken());
	    $scope.flagLogueado = true;
	    console.info("usuario", $scope.usuario);
	}else{
		$scope.flagLogueado = false;
	}

	$scope.Desloguear=function(){
		$auth.logout();
		$scope.flagLogueado = false;
  }

});

