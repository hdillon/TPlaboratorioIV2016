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
  $scope.inmueble.descripcion = "";
  $scope.inmueble.foto = "";
  $scope.inmueble.precio = "";
  $scope.inmueble.direccion = "";
  $scope.inmueble.ambientes;
  $scope.inmueble.tipoOferta;
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
    $scope.inmueble.idVendedor = $scope.usuarioLogueado.id;
    console.info("INMUEBLE ALTA: ", $scope.inmueble);
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.formAltaInmueble.$invalid) { return; }
    if ($scope.arrayNombresFotos.length < 3) {//si no cargó las 3 fotos del inmueble no lo dejo dar el alta
      $scope.faltanFotos = true;
      return; 
    } 
    $("#loadingModal").modal('show');

    for (var i = 0; i < $scope.subidorDeArchivos.queue.length; i++) {
      if (i==0)
        $scope.inmueble.foto = $scope.arrayNombresFotos[i];
      else
        $scope.inmueble.foto = $scope.inmueble.foto + ',' + $scope.arrayNombresFotos[i];
    };
    console.info("inmueble:",$scope.inmueble);
    ServicioABM.alta("inmueble/alta/", $scope.inmueble).then(
      function(respuesta){
        console.info("RESPUESTA (ctrl alta inmueble): ", respuesta);
        $("#loadingModal").modal('hide');
        $state.go('inmueble.catalogo');
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
         $scope.arrayNombresFotos.push(respuesta.data);//guardo en un array los nombres "finales" de las fotos cargadas del inmueble
      },function errorCallback(response) {        
          console.info(response);     
        });
    }
})

app.controller('ControlCatalogoInmueble', function($scope, $http, $state,jwtHelper, $auth, ServicioABM) {
  $("#cargandoCatalogoModal").modal('show');
  $scope.flagLogueado = false;
  $scope.listaInmuebles = [];

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      $scope.flagLogueado = true;
  }else{
    $scope.flagLogueado = false;
    $("#cargandoCatalogoModal").modal('hide');
      $state.go('inicio');
  }

  $scope.Desloguear=function(){
    $auth.logout();
    $scope.flagLogueado = false;
  }

  //traigo las sucursales para llenar el select del formulario
  ServicioABM.traer("inmuebles").then(function(rta){
      $scope.listaInmuebles = rta.data;
      console.info("inmuebles:", $scope.listaInmuebles);
      for (i = 0; i < $scope.listaInmuebles.length; i++) {
        $scope.listaInmuebles[i].fotosArray = [];//Cargo un nuevo array con obj de tipo json para que el carousel pueda levantar las fotos 
        $scope.listaInmuebles[i].foto = $scope.listaInmuebles[i].foto.split(',');
        for (j = 0; j < $scope.listaInmuebles[i].foto.length; j++) {
          $scope.listaInmuebles[i].fotosArray.push(JSON.parse("{" + '"src"' + ":" + '"' + "./fotos/" + $scope.listaInmuebles[i].foto[j] + '"' + "}"));
        }
      }
      console.info("inmuebles after transformation:", $scope.listaInmuebles);
      setTimeout(function () {
          $("#cargandoCatalogoModal").modal('hide');
      }, 1000)
  });


  $scope.reservarInmueble=function(inmueble){
    var objTransaccion = {
      idVendedor : inmueble.id_vendedor,
      idCliente : $scope.usuarioLogueado.id,
      idSucursal : inmueble.id_sucursal,
      idInmueble : inmueble.id,
      importe : inmueble.precio
    };

    ServicioABM.alta("transaccion/alta/", objTransaccion).then(
      function(respuesta){
        console.info("RESPUESTA (ctrl alta transaccion): ", respuesta);
        $("#loadingModal").modal('hide');
        alert("transaccion concretada");
        //$state.go('inmueble.catalogo');
      },
      function(error){
        console.info("ERROR! (ctrl alta transaccion): ", error);
        $("#loadingModal").modal('hide');
        alert("error al cargar transaccion");
      });             
  }

  //PAGINACIÓN:
  $scope.currentPage = 0;
  $scope.pageSize = 4;

  $scope.next=function(){
    $scope.currentPage = $scope.currentPage +1;
    $window.scrollTo(0, 0);               
  }
  

  $scope.numberOfPages=function(){
    return Math.ceil($scope.listaInmuebles.length/$scope.pageSize);                
  }

  function loadPages() {
    console.log('Current page is : ' + $scope.paging.current);
    $scope.currentPage = $scope.paging.current;
  }

})


app.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});