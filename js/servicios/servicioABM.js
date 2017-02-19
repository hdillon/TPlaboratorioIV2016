angular.module('TPInmobiliaria.servicioABM', [])

.service('ServicioABM', function ($http) {
    this.Nombre="servicio ABM";
    var Url="http://localhost/TPlaboratorioIV2016/ws/";

    function traerURL(Parametro){
        return Url;
    }

	this.guardar = function (ruta, obj) {
		console.info("Street Figther: ",JSON.stringify(obj));
		return $http.post(traerURL() + ruta + JSON.stringify(obj)).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio Alta): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio Alta):", error);
		return error;
		});
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

    this.traer = function (ruta) {
       return $http.get(traerURL() + ruta).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traer): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traer):", error);
		return error;
		});
    }

    this.borrar = function (ruta, obj) {
       return $http.put(traerURL() + ruta + JSON.stringify(obj)).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio borrar): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio borrar):", error);
		return error;
		});
    }

    this.traerLogueosPorUsuario = function (ruta, idUsuario) {
       return $http.get(traerURL() +ruta + idUsuario).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio logueosPorUsuario): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio logueosPorUsuario):", error);
		return error;
		});
    }

    this.traerInmueblesPorSucursal = function (ruta, idSucursal) {
       return $http.get(traerURL() +ruta + idSucursal).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio inmueblesPorSucursal): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio inmueblesPorSucursal):", error);
		return error;
		});
    }

    this.traerPersonasSinLocal = function () {
       return $http.get(traerURL() + "personas/sinlocal/").then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerPersonas): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerPersonas):", error);
		return error;
		});
    }

    this.traerVentasPorEmpleado = function (ruta, idSucursal) {
       return $http.get(traerURL() +ruta + idSucursal).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerPersonas): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerPersonas):", error);
		return error;
		});
    }

});