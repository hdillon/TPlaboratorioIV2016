angular.module('TPInmobiliaria.servicioSucursal', [])

.service('ServicioSucursal', function ($http) {
    this.Nombre="servicio sucursales";
    var Url="http://localhost/TPlaboratorioIV2016/ws/";

    function traerURL(Parametro){
        return Url;
    }

	this.altaSucursal = function (sucursal) {
		return $http.post(traerURL() + "sucursal/alta/" + JSON.stringify(sucursal)).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio Alta Sucursal): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio Alta Sucursal):", error);
		return error;
		});
	}

    this.traerUnaSucursal = function(Parametro){
       return "sucursal 1";
    }

    this.traerSucursales = function () {
       return $http.get(traerURL() + "sucursales").then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerSucursales): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerSucursales):", error);
		return error;
		});
    }

});