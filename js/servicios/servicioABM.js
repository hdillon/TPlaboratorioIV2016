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

    this.modificar = function (ruta, obj) {
       return $http.put(traerURL() + ruta + JSON.stringify(obj)).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio modificar): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio modificar):", error);
		return error;
		});
    }

    this.traerPorId = function (ruta, id) {
       return $http.get(traerURL() +ruta + id).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerPorid): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerPorId):", error);
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

});