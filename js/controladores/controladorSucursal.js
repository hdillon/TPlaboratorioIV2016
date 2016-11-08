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

app.controller('ControlGrillaSucursal', function($scope, $http, $state, ServicioSucursal, uiGridConstants, i18nService, NgMap) {
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


    $scope.marker = new google.maps.Marker({
        title: 'default'
      });
    $scope.mapa = {};
    $scope.mapa.latitud = '-34.662716';
    $scope.mapa.longitud = '-58.365113';

/*
    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });
*/  

//TODO: SACAR HARDCODED ARRAY ************************
    var myArray = Array();
    myArray[0] = JSON.parse('{"id":1,"nombre":"Sucursal 1", "data" : "dataa", "fecha" : "01-01-2000"}');
    myArray[1] = JSON.parse('{"id":2,"nombre":"Sucursal 2", "data" : "dataa", "fecha" : "02-02-2000"}');
    myArray[2] = JSON.parse('{"id":3,"nombre":"Sucursal 3", "data" : "dataa", "fecha" : "03-03-2000"}');
    $scope.gridOptions.data = myArray;

    console.log(uiGridConstants);
//TODO: SACAR HARDCODED ARRAY ***********************

    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45},
        { field: 'nombre', name: 'sucursal',
          enableFiltering: false
        },
        { field: 'data', name: 'data'},
        { name: 'Mapa',
          cellTemplate:'<center><button type="button"  data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.mostrarMapaModal()">Mapa</button></center>', width: 75
        },
        { field: 'fecha', name: 'fecha'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        }
      ];
    }

    $scope.mostrarMapaModal = function(){
    $scope.ModalHeader = "Nombre Sucursal";

      NgMap.getMap("miMapaModal").then(function(map) {
        console.log(map.getCenter());
        console.log(map);

        var myLatLng = {lat: Number("-34.603914"), lng: Number("-58.3829876")};
        //elimino el marker anterior del mapa
        $scope.marker.setMap(null);

        $scope.marker = new google.maps.Marker({
          position: myLatLng,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: "Sucursal Nombre"
        });

        $scope.marker.setMap(map);

        $("#myModal").on("shown.bs.modal", function(e) {
        google.maps.event.trigger(map, "resize");
         map.setCenter(myLatLng);// Set here center map coordinates
        });

      });
    }

});


