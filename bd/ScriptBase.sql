-- Base de datos: `inmobiliaria`

CREATE TABLE IF NOT EXISTS `persona` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `persona` ADD `id_local` INT NULL DEFAULT NULL AFTER `estado`;
  
-- Tabla sucursal:

CREATE TABLE IF NOT EXISTS `sucursal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `altura` int(11) NOT NULL,
  `latitud` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `longitud` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `id_encargado` int(11) NOT NULL,
  CONSTRAINT `fk_sucursal_encargado1`
  FOREIGN KEY (`id_encargado`)
  REFERENCES `inmobiliaria`.`persona` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sucursal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE IF NOT EXISTS `sucursal_empleado` (
`id_sucursal` int(11) NOT NULL,
`id_persona` int(11) NOT NULL,
INDEX `fk_sucursal_empleado_sucursal1_idx` (`id_sucursal` ASC),
INDEX `fk_sucursal_empleado_empleado1_idx` (`id_persona` ASC),
CONSTRAINT `fk_sucursal_empleado_sucursal1`
  FOREIGN KEY (`id_sucursal`)
  REFERENCES `inmobiliaria`.`sucursal` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
CONSTRAINT `fk_sucursal_empleado_empleado1`
  FOREIGN KEY (`id_persona`)
  REFERENCES `inmobiliaria`.`persona` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS `inmueble` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(500) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `altura` int(11) NOT NULL,
  `latitud` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `longitud` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `precio` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `ambientes` int(11) NOT NULL,
  `oferta` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  CONSTRAINT `fk_sucursal_sucursal1`
  FOREIGN KEY (`id_sucursal`)
  REFERENCES `inmobiliaria`.`sucursal` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `inmueble`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `inmueble` CHANGE `descripcion` `descripcion` TEXT CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL;


CREATE TABLE IF NOT EXISTS `transaccion` (
  `id` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `id_inmueble` int(11) NOT NULL,
  `importe` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `transaccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
