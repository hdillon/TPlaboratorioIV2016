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

})

app.controller('ControlGrillaSucursal', function($scope, $http, $state, ServicioSucursal, uiGridConstants, i18nService) {
    $scope.titulo = "Configuracion Campos";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

/*
    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });
*/
    console.log(uiGridConstants);

    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45},
        { field: 'nombre', name: 'sucursal'
          ,enableFiltering: false
        },
        { field: 'data', name: 'data'},
        { field: 'data', name: 'data'},
        { field: 'fecha', name: 'fecha'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        }
      ];
    }

});


