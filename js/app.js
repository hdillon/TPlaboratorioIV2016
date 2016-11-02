
var app = angular.module('TPInmobiliaria', ['ui.router', 'satellizer', 'TPInmobiliaria.controllers', 'TPInmobiliaria.controllers', 'TPInmobiliaria.controladorUsuario', 'TPInmobiliaria.services']);

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
      
             $urlRouterProvider.otherwise('/inicio');
});

