angular.module('TPInmobiliaria.services', [])

.factory('Usuario', function () {
        var usuario = {};
        usuario.nombre;
        usuario.apellido;
        usuario.telefono;
        usuario.email;
        usuario.password;
        usuario.estaLogueado = false;

        usuario.setNombre = function (value) {
            this.nombre = value;
        };

        usuario.setApellido = function (value) {
            this.apellido = value;
        };

        usuario.setTelefono = function (value) {
            this.telefono = value;
        };

        usuario.setEmail = function (value) {
            this.email = value;
        };

        usuario.setPassword = function (value) {
            this.password = value;
        };

        usuario.setEstaLogueado = function (value) {
            this.estaLogueado = value;
        };

        usuario.getNombre = function () {
            return usuario.nombre;
        };

        usuario.getApellido = function () {
            return usuario.apellido;
        };

        usuario.getTelefono = function () {
            return usuario.telefono;
        };

        usuario.getEmail = function () {
            return usuario.email;
        };

        usuario.getPassword = function () {
            return usuario.password;
        };

        usuario.getEstaLogueado = function () {
            return usuario.estaLogueado;
        };

        return usuario;
});