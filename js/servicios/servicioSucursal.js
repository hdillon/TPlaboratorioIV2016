angular.module('TPInmobiliaria.servicioSucursal', [])

.service('ServicioSucursal', function ($http) {
    this.Nombre="servicio sucursales";
    var Url="http://localhost:8080/TPlaboratorioIV2016/ws/sucursal/";

    function traerURL(Parametro){
        return Url;
    }

	this.altaSucursal = function (sucursal) {
		return $http.post(traerURL() + "alta/" + JSON.stringify(sucursal)).then(
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
       return "Sucursales";
    }
});