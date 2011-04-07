<?php 
$conectado = false;
if ($conexion = mysql_connect("localhost","root","pantera")){
	if(mysql_select_db("hide_bd",$conexion) or die(mysql_error())){
		$conectado = true;
		
		}
	}
	
?>