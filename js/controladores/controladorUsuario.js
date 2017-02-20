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

});

app.controller('ControlAccesoUsuarios', function($scope, $http, $state, $auth, ServicioABM, jwtHelper) {
	$scope.usuario={};
	$scope.usuario.nombre = "";
	$scope.usuario.apellido = "";
	$scope.usuario.telefono ;
	$scope.usuario.email = "";
	$scope.usuario.password = "";
	$scope.usuario.password2 = "";
	$scope.usuario.foto = "foto.jpg";
	$scope.usuario.perfil = "";
	$scope.usuario.estado = "activo";
	$scope.listaSucursales;

	if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
      console.info("usuarioLogueado", $scope.usuarioLogueado);
    }else{
    $("#loadingModal").modal('hide');
      $state.go('inicio.home', {sesionagotada : "true"});
    }

	$scope.CrearUsuario = function(){
	  $scope.$broadcast('show-errors-check-validity');
	  if ($scope.formAltaUsuario.$invalid) { return; }
	  ServicioABM.guardar("personas/alta/", $scope.usuario).then(
      function(respuesta){
      console.info("RESPUESTA (ctrl alta usuario): ", respuesta);
      $state.go('inicio.home');
      },
      function(error){
        console.info("ERROR! (ctrl alta usuario): ", error);
        alert("ERROR AL CREAR USUARIO");
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
        { field: 'apellido', name: 'apellido'
        },
        { field: 'email', name: 'email'},
        { field: 'telefono', name: 'telefono', enableSorting: false},
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


    $scope.bajaUsuario = function(rowEntity){
      var idusuario = rowEntity.id;
      ServicioABM.borrar("borrarpersona/", idusuario).then(
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

});


