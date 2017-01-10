angular.module('TPInmobiliaria.controladorInmueble', [])

app.controller('ControlInmueble', function($scope, $http, $state,jwtHelper, $auth) {
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

})

app.controller('ControlAltaInmueble', function($scope, $http, $state, jwtHelper, FileUploader, $auth, ServicioABM) {
   $("#loadingModal").modal('show');
  $scope.inmueble = {};
  $scope.inmueble.descripcion = "Casa 2H";
  $scope.inmueble.foto = "";
  $scope.inmueble.precio = "";
  $scope.inmueble.direccion = "";
  $scope.inmueble.idSucursal = "";
  $scope.subidorDeArchivos = new FileUploader({url:'PHP/nexo.php'});
  $scope.subidorDeArchivos.queueLimit = 3;
  $scope.arrayNombresFotos = [];
  $scope.faltanFotos;
  $scope.listaSucursales;

  if($auth.isAuthenticated()){
    setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 10000)
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuario", $scope.usuarioLogueado);
  }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio');
  }

  //traigo las sucursales para llenar el select del formulario
  ServicioABM.traerSucursales().then(function(rta){
      $scope.listaSucursales = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
    });

  $scope.AltaInmueble = function(){
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.formAltaInmueble.$invalid) { return; }
    if ($scope.arrayNombresFotos.length < 3) {//si no cargó las 3 fotos del inmueble no lo dejo dar el alta
      $scope.faltanFotos = true;
      return; 
    } 
    $("#loadingModal").modal('show');

    for (var i = 0; i < $scope.subidorDeArchivos.queue.length; i++) {
      if (i==0)
        $scope.inmueble.foto = $scope.arrayNombresFotos[i].data;
      else
        $scope.inmueble.foto = $scope.inmueble.foto + ';' + $scope.arrayNombresFotos[i].data;
    };

    ServicioABM.alta("inmueble/alta/", $scope.inmueble).then(
      function(respuesta){
        console.info("RESPUESTA (ctrl alta inmueble): ", respuesta);
        $("#loadingModal").modal('hide');
        $state.go('inicio');
      },
      function(error){
        console.info("ERROR! (ctrl alta inmueble): ", error);
        $("#loadingModal").modal('hide');
        alert("error al cargar inmueble");
      }
    );
  }

  $scope.subidorDeArchivos.onSuccessItem=function(item, response, status, headers){
      //Obtengo el nombre de la foto al momento del upload
      console.info("ITEM", item._file.name);
      $scope.inmueble.foto = item._file.name;
      $http.post('PHP/nexo.php', { datos: {accion :"uploadFotoInmueble",inmueble:$scope.inmueble}})
        .then(function(respuesta) {         
         console.info("respuesta", respuesta);
         $scope.arrayNombresFotos.push(respuesta);//guardo en un array los nombres "finales" de las fotos cargadas del inmueble
      },function errorCallback(response) {        
          console.info(response);     
        });
    }

});