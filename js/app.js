
var app = angular.module('TPInmobiliaria', [
    'ui.router', 
    'satellizer', 
    'angularFileUpload', 
    'ngMap',
    'jkAngularCarousel',
    'angular-jwt',
    'ngMaterial',
    'cl.paging',
    'TPInmobiliaria.controllers', 
    'TPInmobiliaria.controladorInmueble', 
    'TPInmobiliaria.controladorUsuario', 
    'TPInmobiliaria.controladorSucursal', 
    'TPInmobiliaria.services', 
    'TPInmobiliaria.servicioABM',
    'TPInmobiliaria.servicioGeocoding',
    'TPInmobiliaria.directivaErrores',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.edit',
    'ui.bootstrap',
    'dataGrid',
    'pagination'
    ]);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'TPlaboratorioIV2016/PHP/auth.php'; //Ruta del archivo auth que esta en jwt y direcciona a PHP
  $authProvider.tokenName = 'ElNombreDelToken'; //nombre largo
  $authProvider.tokenPrefix = 'Aplicacion'; //sarasa
  $authProvider.authHeader = 'data';
  
  $stateProvider
      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/inicio.html',
                controller : 'ControlInicio'
            })
      .state('usuario', {
                url : '/usuario',
                abstract:true,
                templateUrl : 'vistas/abstractaUsuario.html',
                controller : 'ControlUsuarios'
            })
      .state('usuario.login', {
                url: '/login',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuario/usuarioLogin.html',
                        controller : 'ControlAccesoUsuarios'
                    }
                }
            })
      .state('usuario.registrarse', {
                url: '/registrarse',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuario/usuarioRegistrarse.html',
                        controller : 'ControlAccesoUsuarios'
                    }
                }
            })
      .state('usuario.alta', {
                url: '/alta',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuario/usuarioAlta.html',
                        controller : 'ControlAccesoUsuarios'
                    }
                }
            })
      .state('sucursal', {
                url : '/sucursal',
                abstract:true,
                templateUrl : 'vistas/abstractaSucursal.html',
                controller : 'ControlSucursales'
            })
      .state('sucursal.altasucursales', {
                url: '/altasucursales',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/sucursal/sucursalAlta.html',
                        controller : 'ControlAltaSucursal'
                    }
                }
            })
      .state('sucursal.grilla', {
                url: '/grilla',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/sucursal/sucursalGrilla.html',
                        controller : 'ControlGrillaSucursal'
                    }
                }
            })
      .state('inmueble', {
                url : '/inmueble',
                abstract:true,
                templateUrl : 'vistas/abstractaInmueble.html',
                controller : 'ControlInmueble'
            })
      .state('inmueble.altainmueble', {
                url: '/altainmueble',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/inmuebleAlta.html',
                        controller : 'ControlAltaInmueble'
                    }
                }
            })
      .state('inmueble.catalogo', {
                url: '/catalogo',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/catalogo.html',
                        controller : 'ControlCatalogoInmueble'
                    }
                }
            })
      .state('estadisticas', {
                url : '/estadisticas',
                abstract:true,
                templateUrl : 'vistas/abstractaEstadisticas.html',
                controller : 'ControlEstadisticas'
            })
      .state('estadisticas.ventasporlocal', {
                url: '/ventasporlocal',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlVentasPorLocal'
                    }
                }
            })
      .state('estadisticas.ventasporempleado', {
                url: '/ventasporempleado',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlVentasPorEmpleado'
                    }
                }
            })
      .state('estadisticas.encuestas', {
                url: '/encuestas',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlEstadisticasEncuestas'
                    }
                }
            })
      .state('estadisticas.login', {
                url: '/login',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlEstadisticasLogin'
                    }
                }
            })
      
      
             $urlRouterProvider.otherwise('/inicio');
});
