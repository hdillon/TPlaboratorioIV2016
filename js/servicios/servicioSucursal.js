angular.module('TPInmobiliaria.servicioSucursal', [])

.service('ServicioSucursal', function ($http) {

    this.Nombre="servicio sucursales";

    this.traerUnaSucursal = function(Parametro){
       return "sucursal 1";
    }

    this.traerSucursales = function () {
       return "Sucursales";
    }
});