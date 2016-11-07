angular.module('TPInmobiliaria.controladorSucursal', [])

app.controller('ControlSucursales', function($scope, $http, $state) {


})

app.controller('ControlAltaSucursal', function($scope, $http, FileUploader) {

	$scope.sucursal = {};
	$scope.sucursal.nombre = "Sucursal 1";
	$scope.sucursal.direccion = "Calle falsa 123";
	$scope.sucursal.foto;
	$scope.subidorDeArchivos = new FileUploader({url:'PHP/nexo.php'});

	$scope.AltaSucursal = function(){
		alert("alta sucursal");
	}

	$scope.subidorDeArchivos.onSuccessItem=function(item, response, status, headers){
	    //OBTENGO EL NOMBRE DE LA FOTO EN EL MOMENTO DEL UPLOAD:
	    console.info("ITEM", item._file.name);
	    $scope.sucursal.foto = item._file.name;
	    $http.post('PHP/nexo.php', { datos: {accion :"uploadFoto",sucursal:$scope.sucursal}})
   	    .then(function(respuesta) {         
		     console.info("respuesta", respuesta.data);
		     //$scope.persona.foto = "pordefecto.jpg";
		     //console.info("Ya guardé el archivo.", item, response, status, headers);
  		},function errorCallback(response) {        
		      console.log( response);   
		      //$scope.persona.foto = "pordefecto.jpg";        
  	    });
    }

});


