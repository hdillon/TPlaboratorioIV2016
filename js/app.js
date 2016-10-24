
var app = angular.module('TPInmobiliaria', ['ui.router', 'TPInmobiliaria.controllers']);

app.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/inicio.html',
                controller : 'controlInicio'
            })
      
             $urlRouterProvider.otherwise('/inicio');
});

