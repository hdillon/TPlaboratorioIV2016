angular.module('TPInmobiliaria.controladorSucursal', [])

app.controller('ControlSucursales', function($scope, $http, $state) {


})

app.controller('ControlAltaSucursal', function($scope, $http, FileUploader) {

	$scope.sucursal = {};
	$scope.sucursal.nombre = "Sucursal 1";
	$scope.sucursal.direccion = "Calle falsa 123";
	$scope.subidorDeArchivos = new FileUploader();

	$scope.AltaSucursal = function(){
		alert("alta sucursal");
	}
});


