-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 13-04-2011 a las 23:32:47
-- Versión del servidor: 5.5.8
-- Versión de PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guardias`
--

CREATE TABLE IF NOT EXISTS `guardias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_plazas` int(11) NOT NULL,
  `descrip` varchar(150) NOT NULL,
  `hora_ini` time NOT NULL,
  `hora_fin` time NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_plazas` (`id_plazas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `guardias`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE IF NOT EXISTS `horarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `title` text CHARACTER SET latin1 NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `recur_rule` int(11) NOT NULL,
  `loc` text CHARACTER SET latin1 NOT NULL,
  `notes` text CHARACTER SET latin1 NOT NULL,
  `url` text CHARACTER SET latin1 NOT NULL,
  `ad` tinyint(1) NOT NULL,
  `rem` text CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1022 ;

--
-- Volcar la base de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `cid`, `title`, `start`, `end`, `recur_rule`, `loc`, `notes`, `url`, `ad`, `rem`) VALUES
(1005, 1, 'jean', '2011-04-05 07:00:00', '2011-04-05 08:00:00', 0, '', '', '', 1, ''),
(1006, 2, 'nuevo', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 1, ''),
(1008, 3, 'escuela', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1009, 1, 'prueba', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1010, 2, 'otra prueba', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1011, 1, 'mas prueba', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1012, 1, 'muchas mas pruebas', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1013, 1, 'nojoda nos llenamos de pruebas', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1014, 2, 'aqui otra', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1015, 3, 'otra mas', '2011-04-05 00:00:00', '2011-04-05 01:00:00', 0, '', '', '', 0, ''),
(1020, 3, 'Trabajo', '2011-04-06 00:00:00', '2011-04-06 01:00:00', 0, '', '', '', 0, ''),
(1021, 3, 'LA VELA', '2011-04-07 00:00:00', '2011-04-07 01:00:00', 0, '', '', '', 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plazas`
--

CREATE TABLE IF NOT EXISTS `plazas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `descrip` text NOT NULL,
  `color` int(11) NOT NULL,
  `hidden` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcar la base de datos para la tabla `plazas`
--

INSERT INTO `plazas` (`id`, `title`, `descrip`, `color`, `hidden`) VALUES
(1, 'LA VELA', 'esto es para el hogar', 2, 0),
(2, 'Trabajo', 'esto es para el trabajo', 22, 0),
(3, 'Escuela', 'esto es para la escuela', 1, 0),
(4, 'SAMBIL', '', 4, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedores`
--

CREATE TABLE IF NOT EXISTS `vendedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(7) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` text NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Volcar la base de datos para la tabla `vendedores`
--

INSERT INTO `vendedores` (`id`, `codigo`, `nombre`, `apellido`, `direccion`, `email`, `telefono`) VALUES
(5, '5589', 'darwin', 'newman', 'mi otra casa', 'a@b.com', '4532345'),
(6, '5589', 'jdhn', 'este', '', '', '');

--
-- Filtros para las tablas descargadas (dump)
--

--
-- Filtros para la tabla `guardias`
--
ALTER TABLE `guardias`
  ADD CONSTRAINT `guardias_ibfk_1` FOREIGN KEY (`id_plazas`) REFERENCES `plazas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
