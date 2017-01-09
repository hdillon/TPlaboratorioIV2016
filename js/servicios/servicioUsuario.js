angular.module('TPInmobiliaria.servicioUsuario', [])

.service('ServicioUsuario', function ($http) {
    this.Nombre="servicio usuarios";
    var Url="http://localhost/TPlaboratorioIV2016/ws/personas/";

    function traerURL(Parametro){
        return Url;
    }

	this.altaPersona = function (persona) {
		return $http.post(traerURL() + "alta/" + JSON.stringify(persona)).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio Alta Persona): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio Alta Persona):", error);
		return error;
		});
	}

    this.traerUnaPersona = function(Parametro){
       return "Persona 1";
    }

    this.traerPersonas = function () {
       return $http.get(traerURL()).then(
		function(respuesta){
			console.info("RESPUESTA (Servicio traerPersonas): ", respuesta);
			return respuesta; 
		},
		function(error){
			console.info("ERROR (Servicio traerPersonas):", error);
		return error;
		});
    }

    this.traerPersonasSinLocal = function () {
       return $http.get(traerURL() + "sinlocal/").then(
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