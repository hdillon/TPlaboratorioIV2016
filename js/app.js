
var app = angular.module('TPInmobiliaria', ['ui.router', 'TPInmobiliaria.controllers']);

app.config(function($stateProvider, $urlRouterProvider) {
  
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
                controller : 'ControlUsuario'
            })
      .state('usuario.login', {
                url: '/login',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuarioLogin.html',
                        controller : 'ControlUsuario'
                    }
                }
            })
      .state('usuario.registrarse', {
                url: '/registrarse',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuarioRegistrarse.html',
                        controller : 'ControlUsuario'
                    }
                }
            })
      
             $urlRouterProvider.otherwise('/inicio');
});

