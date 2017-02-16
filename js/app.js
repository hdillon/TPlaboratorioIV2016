
var app = angular.module('TPInmobiliaria', [
    'ui.router', 
    'satellizer', 
    'angularFileUpload', 
    'ngMap',
    'jkAngularCarousel',
    'angular-jwt',
    'ngMaterial',
    'mdSteppers',
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
    'pagination',
    'ngAnimate'
    ]);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'TPlaboratorioIV2016/PHP/auth.php'; //Ruta del archivo auth que esta en jwt y direcciona a PHP
  $authProvider.tokenName = 'ElCampitoToken'; //nombre largo
  $authProvider.tokenPrefix = 'Aplicacion'; //sarasa
  $authProvider.authHeader = 'data';
  
  $stateProvider
      .state('inicio', {
                url : '/inicio',
                abstract:true,
                templateUrl : 'vistas/inicio.html',
                controller : 'ControlInicio'
            })
      .state('inicio.home', {
                url : '/home',
                templateUrl : 'vistas/home.html',
                controller : 'ControlInicio'
            })
      .state('usuario', {
                url : '/usuario',
                abstract:true,
                templateUrl : 'vistas/abstractaUsuario.html',
                controller : 'ControlUsuarios'
            })
      .state('inicio.usuariomenu', {
                url: '/usuariomenu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuario/usuarioMenu.html',
                        controller : 'ControlUsuarios'
                    }
                }
            })
      .state('inicio.login', {
                url: '/login',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuario/usuarioLogin.html',
                        controller : 'ControlAccesoUsuarios'
                    }
                }
            })
      .state('inicio.registrarse', {
                url: '/registrarse',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuario/usuarioRegistrarse.html',
                        controller : 'ControlAccesoUsuarios'
                    }
                }
            })
      .state('inicio.altausuario', {
                url: '/altausuario',
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
      .state('inicio.sucursalmenu', {
                url: '/sucursalmenu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/sucursal/sucursalMenu.html',
                        controller : 'ControlSucursales'
                    }
                }
            })
      .state('inicio.altasucursales', {
                url: '/altasucursales',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/sucursal/sucursalAlta.html',
                        controller : 'ControlAltaSucursal'
                    }
                }
            })
      .state('inicio.nuestrassucursales', {
                url: '/nuestrassucursales',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/sucursal/nuestrassucursales.html',
                        controller : 'ControlSucursales'
                    }
                }
            })
      .state('inicio.grilla', {
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
      .state('inicio.inmueblemenu', {
                url: '/inmueblemenu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/inmuebleMenu.html',
                        controller : 'ControlInmueble'
                    }
                }
            })
      .state('inicio.altainmueble', {
                url: '/altainmueble',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/inmuebleAlta.html',
                        controller : 'ControlAltaInmueble'
                    }
                }
            })
      .state('inicio.catalogo', {
                url: '/catalogo',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/catalogo.html',
                        controller : 'ControlCatalogoInmueble'
                    }
                }
            })
      .state('inicio.encuesta', {
                url: '/encuesta',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/encuesta.html',
                        controller : 'ControlEncuesta'
                    }
                }
            })
      .state('estadisticas', {
                url : '/estadisticas',
                abstract:true,
                templateUrl : 'vistas/abstractaEstadisticas.html',
                controller : 'ControlEstadisticas'
            })
      .state('inicio.estadisticasmenu', {
                url: '/estadisticasmenu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticasMenu.html',
                        controller : 'ControlEstadisticas'
                    }
                }
            })
      .state('inicio.ventasporlocal', {
                url: '/ventasporlocal',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlVentasPorLocal'
                    }
                }
            })
      .state('inicio.ventasporempleado', {
                url: '/ventasporempleado',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlVentasPorEmpleado'
                    }
                }
            })
      .state('inicio.encuestas', {
                url: '/encuestas',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlEstadisticasEncuestas'
                    }
                }
            })
      .state('inicio.encuestaslogin', {
                url: '/encuestaslogin',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/estadisticas/estadisticas.html',
                        controller : 'ControlEstadisticasLogin'
                    }
                }
            })
      
      
             $urlRouterProvider.otherwise('inicio/home');
});
