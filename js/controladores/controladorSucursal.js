angular.module('TPInmobiliaria.controladorSucursal', [])

app.controller('ControlSucursales', function($scope, $http, $state,jwtHelper, $auth) {
  $scope.flagLogueado = false;

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      $scope.flagLogueado = true;
      console.info("usuario", $scope.usuarioLogueado);
  }else{
    $scope.flagLogueado = false;
  }

  $scope.Desloguear=function(){
    $auth.logout();
    $scope.flagLogueado = false;
  }

  $scope.redirectTo=function(where){
    $state.go(where);
  }

})

app.controller('ControlAltaSucursal', function($scope, $http, $state, jwtHelper, FileUploader,NgMap, $auth, ServicioABM, ServicioGeocoding) {
  $("#loadingModal").modal('show');
  $scope.sucursal = {};
  $scope.sucursal.nombre;
  $scope.sucursal.localidad;
  $scope.sucursal.direccion;
  $scope.sucursal.latitud;
  $scope.sucursal.longitud;
  $scope.sucursal.email;
  $scope.sucursal.telefono;
  $scope.sucursal.foto = "";
  $scope.sucursal.idEncargado;
  $scope.subidorDeArchivos = new FileUploader({url:'PHP/nexo.php'});
  $scope.subidorDeArchivos.queueLimit = 3;
  $scope.arrayNombresFotos = [];
  $scope.faltanFotos;
  $scope.listaPersonas;

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuario", $scope.usuarioLogueado);
  }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio.menuinicio', {sesionagotada : "true"});
  }

  $scope.marker = new google.maps.Marker({title: 'default'});
  $scope.mapa = {};
  $scope.mapa.latitud = '-34.662716';
  $scope.mapa.longitud = '-58.365113';

  //traigo los usuarios que no tienen un local asignado para llenar los select del formulario
  ServicioABM.traerPersonasSinLocal().then(function(rta){
      $scope.listaPersonas = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
    });

  $scope.AltaSucursal = function(){
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.formAltaSucursal.$invalid) { return; }
    if ($scope.arrayNombresFotos.length < 3) {//si no cargó las 3 fotos de la sucursal no lo dejo dar el alta
      $scope.faltanFotos = true;
      return; 
    } 
    $("#loadingModal").modal('show');

    for (var i = 0; i < $scope.subidorDeArchivos.queue.length; i++) {
      if (i==0)
        $scope.sucursal.foto = $scope.arrayNombresFotos[i].data;
      else
        $scope.sucursal.foto = $scope.sucursal.foto + ';' + $scope.arrayNombresFotos[i].data;
    };

    ServicioABM.guardar("sucursal/alta/", $scope.sucursal).then(
      function(respuesta){
        console.info("RESPUESTA (ctrl alta sucursal): ", respuesta);
        $("#loadingModal").modal('hide');
        $state.go('inicio.menuinicio');
      },
      function(error){
        console.info("ERROR! (ctrl alta sucursal): ", error);
        $("#loadingModal").modal('hide');
        alert("error al cargar sucursal");
      }
    );
  }

  $scope.subidorDeArchivos.onSuccessItem=function(item, response, status, headers){
    //Obtengo el nombre de la foto al momento del upload
    console.info("ITEM", item._file.name);
    $scope.sucursal.foto = item._file.name;
    $http.post('PHP/nexo.php', { datos: {accion :"uploadFoto",sucursal:$scope.sucursal}})
      .then(function(respuesta) {         
       console.info("respuesta", respuesta);
       $scope.arrayNombresFotos.push(respuesta);//guardo en un array los nombres "finales" de las fotos cargadas a la sucursal
    },function errorCallback(response) {        
        console.info(response);     
      });
  }

  $scope.mostrarMapaModal = function(){
      $scope.ModalHeader = "Cargar Direccion";
      NgMap.getMap("miMapaModal").then(function(map) {
        console.log(map.getCenter());
        console.log(map);

        var myLatLng = {lat: -34.397, lng: 150.644};
        //elimino el marker anterior del mapa
        $scope.marker.setMap(null);
        var geocoder = new google.maps.Geocoder();

        $("#myModal").on("shown.bs.modal", function(e) {
        google.maps.event.trigger(map, "resize");
         map.setCenter(myLatLng);// Set here center map coordinates
        });

        document.getElementById('submit').addEventListener('click', function() {
          if(document.getElementById('address').value == ""){
            alert("Debe ingresar una direccion");
            return;
          }
          $scope.geocodeAddress(geocoder, map);
        });
      });
    }

    $scope.geocodeAddress = function(geocoder, resultsMap) {
        $scope.marker.setMap(null);
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            $scope.sucursal.latitud = results[0].geometry.location.lat();
            $scope.sucursal.longitud = results[0].geometry.location.lng();
            resultsMap.setCenter(results[0].geometry.location);
            $scope.marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              draggable: true,
              animation: google.maps.Animation.DROP
            });
          } else {
            alert('No se encontraron resultados: ' + status);
          }
        });
      }

    $scope.confirmarDireccion = function(){
      $scope.sucursal.direccion = $scope.direccionMapa;
    }

})


app.controller('ControlNuestrasSucursales', function($scope, $http, $state, ServicioABM, NgMap, jwtHelper, $auth) {
  $("#loadingModal").modal('show');
  $scope.listaSucursales = [];

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuario", $scope.usuarioLogueado);
  }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio.menuinicio', {sesionagotada : "true"});
  }

  ServicioABM.traerSucursales().then(function(rta){
      $scope.listaSucursales = rta.data;
      for (i = 0; i < $scope.listaSucursales.length; i++) {
        $scope.listaSucursales[i].fotosArray = [];//Cargo un nuevo array con obj de tipo json para que el carousel pueda levantar las fotos 
        $scope.listaSucursales[i].foto = $scope.listaSucursales[i].foto.split(';');
        for (j = 0; j < $scope.listaSucursales[i].foto.length; j++) {
          $scope.listaSucursales[i].fotosArray.push(JSON.parse("{" + '"src"' + ":" + '"' + "./fotos/" + $scope.listaSucursales[i].foto[j] + '"' + "}"));
        }
      }
      console.info("Sucursales: ", $scope.listaSucursales);
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
      
    });

  $scope.marker = new google.maps.Marker({
        title: 'default'
      });
    $scope.mapa = {};
    $scope.mapa.latitud = '-34.662716';
    $scope.mapa.longitud = '-58.365113';

  $scope.mostrarMapaModal = function(sucursal){
      $scope.ModalHeader = sucursal.direccion;
      console.info("sucursal: ", sucursal);

        NgMap.getMap("miMapaModal").then(function(map) {
          console.log(map.getCenter());
          console.log(map);

          var myLatLng = {lat: Number(sucursal.latitud), lng: Number(sucursal.longitud)};
          //elimino el marker anterior del mapa
          $scope.marker.setMap(null);

          $scope.marker = new google.maps.Marker({
            position: myLatLng,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: sucursal.nombre
          });

          $scope.marker.setMap(map);

          $("#myModal").on("shown.bs.modal", function(e) {
          google.maps.event.trigger(map, "resize");
           map.setCenter(myLatLng);// Set here center map coordinates
          });


          google.maps.event.addListener(map, 'dblclick', function(event) {
            marker = new google.maps.Marker({position: event.latLng, map: map});
            var latitude = marker.position.lat();
            var longitude = marker.position.lng();
            console.info("lat: ", latitude);
            console.info("longitude: ", longitude);
          });

        });
    }

    $scope.MostrarCatalogoSucursal=function(sucursal){
      $state.go('inicio.catalogo',{sucursal : JSON.stringify(sucursal)});
    }

});

