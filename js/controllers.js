angular.module('TPInmobiliaria.controllers', [])

app.controller('ControlInicio', function($scope, $state, $auth) {
	$scope.flagLogueado = false;

	if($auth.isAuthenticated())
	    $scope.flagLogueado = true;
	  else
	    $scope.flagLogueado = false;
});

