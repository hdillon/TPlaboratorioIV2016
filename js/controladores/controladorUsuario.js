angular.module('TPInmobiliaria.controladorUsuario', [])

app.controller('ControlUsuarios', function($scope, $http, $state, jwtHelper, $auth) {
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

  $scope.FormularioAltaUsuario=function(){
    $state.go("inicio.altausuario");
  }

})

app.controller('ControlAccesoUsuarios', function($scope, $http, $state, $stateParams, $auth, ServicioABM, jwtHelper) {
  $scope.accion = "Alta";
  $scope.accionFormulario = "CrearUsuario";
  $scope.usuario={};
  $scope.usuario.nombre = "";
  $scope.usuario.apellido = "";
  $scope.usuario.email = "";
  $scope.usuario.password = "";
  $scope.usuario.perfil = "";
  $scope.usuario.estado = "activo";
  $scope.listaSucursales;
  $scope.sucursalEmpleado = {};
  $scope.sucursalEmpleado.idsucursal = "";

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuarioLogueado", $scope.usuarioLogueado);
    }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio.menuinicio', {sesionagotada : "true"});
    }
    console.info("USER: ",$stateParams.usuario);
   if($stateParams.usuario != "" && $stateParams.usuario != undefined){
    $scope.accion = "Editar";
    $scope.accionFormulario = "ModificarUsuario";
      var pUsuario = JSON.parse($stateParams.usuario);
      $scope.usuario.id = pUsuario.id;
      $scope.usuario.nombre = pUsuario.nombre;
      $scope.usuario.apellido = pUsuario.apellido;
      $scope.usuario.email = pUsuario.email;
      $scope.usuario.password = pUsuario.password;
   }

   //traigo los usuarios que no tienen un local asignado para llenar los select del formulario
  ServicioABM.traerSucursales().then(function(rta){
    console.info("SUCURSALESSS ", rta);
      $scope.listaSucursales = rta.data;
      setTimeout(function () {
          $("#loadingModal").modal('hide');
      }, 1000)
    });

  $scope.CrearUsuario = function(){
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.formAltaUsuario.$invalid) { return; }
    ServicioABM.guardar("personas/alta/", $scope.usuario).then(
      function(respuesta){
        if($scope.usuario.perfil == "empleado"){
          $scope.sucursalempleado={};
          $scope.sucursalempleado.idempleado = respuesta.data.slice(1, -1);
          $scope.sucursalempleado.idsucursal = $scope.sucursalEmpleado.idsucursal;
          ServicioABM.guardar("persona/altasucursalempleado/", $scope.sucursalempleado).then(
          function(respuesta){
            console.info("ALTA OK");
          },
          function(error){
            console.info("ERROR! (ctrl alta usuario): ", error);
            alert("ERROR AL CREAR USUARIO");
          });
        }
      $state.go('inicio.menuinicio');
      },
      function(error){
        console.info("ERROR! (ctrl alta usuario): ", error);
        alert("ERROR AL CREAR USUARIO");
      });
  }

  $scope.ModificarUsuario = function(){
    $scope.$broadcast('show-errors-check-validity');
    if ($scope.formAltaUsuario.$invalid) { return; }
    ServicioABM.modificar("modificarpersona/", $scope.usuario).then(
        function(respuesta){
        $state.go("inicio.grillausuarios");
        },
        function(error){
          console.info("ERROR! (modificar usuario): ", error);
      });
  }

})

app.controller('ControlGrillaUsuario', function($scope, $http, $state, $timeout, uiGridConstants, i18nService, ServicioABM, $mdDialog) {
    $("#cargandoGrillaModal").modal('show');
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.enableGridMenu = true;
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    //Exprot cfg------------------------------------
    $scope.gridOptions.exporterCsvFilename = 'ListadoUsuarios.csv';
    $scope.gridOptions.exporterCsvColumnSeparator = ';';
    $scope.gridOptions.exporterPdfDefaultStyle = {fontSize: 9};
    $scope.gridOptions.exporterPdfTableStyle = {margin: [1, 1, 1, 1]};
    $scope.gridOptions.exporterPdfHeader = { text: "Listado Usuarios", style: 'headerStyle' };
    $scope.gridOptions.exporterPdfTableHeaderStyle = {fontSize: 10, bold: true, italics: true, color: 'red'};
    $scope.gridOptions.exporterPdfOrientation = 'portrait';
    $scope.gridOptions.exporterPdfPageSize = 'LETTER';
    $scope.gridOptions.exporterPdfMaxGridWidth = 500;
    $scope.gridOptions.exporterPdfCustomFormatter = function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true, color: '#1E90FF', alignment:'center' };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    };
    $scope.export_column_type = 'all';
    $scope.export_row_type = 'all';
    $scope.export_format = 'csv';

    $scope.gridOptions.exporterHeaderFilter = function( displayName ) { 
      if( displayName === 'Name' ) { 
        return 'Person Name'; 
      } else { 
        return displayName;
      } 
    };

    $scope.gridOptions.exporterFieldCallback = function( grid, row, col, input ) {
      if( col.name == 'gender' ){
        switch( input ){
          case 1:
            return 'female';
            break;
          case 2:
            return 'male';
            break;
          default:
            return 'unknown';
            break;
        }
      } else {
        return input;
      }
    };
    $scope.gridOptions.onRegisterApi = function(gridApi){ 
      $scope.gridApi = gridApi;
    };


    ServicioABM.traer("personas/").then(function(rta){
      // Cargo los datos en la grilla.
      console.info("rta", rta.data);
      $scope.gridOptions.data = rta.data;
      setTimeout(function () {
          $("#cargandoGrillaModal").modal('hide');
      }, 1000)
      
    });

    function columnDefs () {
      return [
        { field: 'id', name: 'ID', width: 45,enableSorting: false},
        { field: 'apellido', name: 'apellido'},
        { field: 'nombre', name: 'nombre'},
        { field: 'email', name: 'email'},
        { field: 'perfil', name: 'perfil'},
        { field: 'estado', name: 'estado', },
        { name: 'Editar', enableFiltering: false,enableSorting: false,
          cellTemplate:'<center><button type="button" class="btn btn-info" ng-click="grid.appScope.EditarUsuario(row.entity)">Editar</button></center>', width: 75
        },
        { name: 'Baja', enableFiltering: false,enableSorting: false,
          cellTemplate:'<center><button type="button" class="btn btn-danger" ng-click="grid.appScope.bajaUsuario(row.entity)">Bloquear</button></center>', width: 75
        }
      ];
    }

    $scope.EditarUsuario = function(rowEntity){
      $state.go('inicio.altausuario',{usuario : JSON.stringify(rowEntity)});
    }

    $scope.bajaUsuario = function(rowEntity){
      var idusuario = Number(rowEntity.id);
      console.info("ID DE USUARIO A BORRAR: ", idusuario);
      ServicioABM.modificar("borrarpersona/", idusuario).then(
        function(respuesta){
        console.info("RESPUESTA (borrar usuario): ", respuesta);
        $scope.informarBajaConcretada();
        },
        function(error){
          console.info("ERROR! (borrar usuario): ", error);
      });
    }

    $scope.informarBajaConcretada = function() {
    var confirm = $mdDialog.confirm({
                    onComplete: function afterShowAnimation() {
                        var $dialog = angular.element(document.querySelector('md-dialog'));
                        var $actionsSection = $dialog.find('md-dialog-actions');
                        var $cancelButton = $actionsSection.children()[0];
                        var $confirmButton = $actionsSection.children()[1];
                        angular.element($confirmButton).addClass('md-raised');
                    }
                })
          .title('Listo!')
          .textContent('El usuario ha sido dado de baja.')
          .ariaLabel('Lucky day')
          .ok('Continuar')

    $mdDialog.show(confirm).then(function() {
      $state.reload();
    }, function() {
      $state.go('inicio.home');
    });
  };

    $scope.export = function(){
      if ($scope.export_format == 'csv') {
        var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
        $scope.gridApi.exporter.csvExport( $scope.export_row_type, $scope.export_column_type, myElement );
      }else if ($scope.export_format == 'pdf') {
        $scope.gridApi.exporter.pdfExport( $scope.export_row_type, $scope.export_column_type );
      }
    }

})

app.controller('ControlMisReservas', function($scope, $http, $state, ServicioABM, NgMap, $auth, jwtHelper) {
  $("#loadingModal").modal('show');
  $scope.listaReservas = [];

  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
    $scope.flagLogueado = true;
    console.info("usuario", $scope.usuarioLogueado);
  }else{
    $state.go('inicio.menuinicio', {sesionagotada : "true"});
  }

  ServicioABM.traerPorId("reservasporcliente/", $scope.usuarioLogueado.id).then(function(rta){
    $scope.listaReservas = rta.data;
    console.info("inmuebles:", $scope.listaReservas);
    console.info("Cantodad reservas: ", $scope.listaReservas.length);
    if($scope.listaReservas.length == 0)
    {
      $scope.tituloReservas = "No Posee Reservas";
    }else{
      $scope.tituloReservas = "Sus Reservas";
      for (i = 0; i < $scope.listaReservas.length; i++) {
        $scope.listaReservas[i].fotosArray = [];//Cargo un nuevo array con obj de tipo json para que el carousel pueda levantar las fotos 
        $scope.listaReservas[i].foto = $scope.listaReservas[i].foto.split(',');
        for (j = 0; j < $scope.listaReservas[i].foto.length; j++) {
          $scope.listaReservas[i].fotosArray.push(JSON.parse("{" + '"src"' + ":" + '"' + "./fotos/" + $scope.listaReservas[i].foto[j] + '"' + "}"));
        }
      }
    }
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
        });
    }

});



