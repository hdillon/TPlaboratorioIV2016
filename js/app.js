
var app = angular.module('TPInmobiliaria', ['ui.router', 'satellizer', 'angularFileUpload', 'TPInmobiliaria.controllers', 'TPInmobiliaria.controllers', 'TPInmobiliaria.controladorUsuario', 'TPInmobiliaria.controladorSucursal', 'TPInmobiliaria.services']);

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


      .state('inmueble', {
                url : '/inmuebles',
                abstract:true,
                templateUrl : 'vistas/abstractaInmueble.html',
                controller : 'ControlInmuebles'
            })
      .state('inmueble.venta', {
                url: '/venta',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/inmuebleVenta.html',
                        controller : 'ControlVentaInmueble'
                    }
                }
            })
      .state('inmueble.alquiler', {
                url: '/alquiler',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/inmuebleAlquiler.html',
                        controller : 'ControlAlquilerInmueble'
                    }
                }
            })
      .state('inmueble.grilla', {
                url: '/grilla',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/inmueble/inmuebleAlquiler.html',
                        controller : 'ControlAlquilerInmueble'
                    }
                }
            })
      
             $urlRouterProvider.otherwise('/inicio');
});

