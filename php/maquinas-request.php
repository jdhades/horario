<?
// vim: ts=4:sw=4:nu:fdc=4:nospell

require("../classes/csql.php");

if(!isset($_REQUEST["cmd"])) {
	return;
}

$objects = array(
	// {{{
	// company
	
	"maquinas"=>array(
		"table"=>"maquinas as a " .
		          "inner join modelo as b on a.id_modelo = b.id_modelo " .
		          "inner join billeteros as c on a.id_billetero = c.id_billetero " .
			  "inner join juegos as d on a.id_juego = d.id_juego " .
			  "inner join tarjetas as e on a.s_tarjetas = e.serial " .
			  "inner join principal as f on a.rif_principal = f.rif"
		,"table1"=>"maquinas"
		,"idName"=>"serial"
		,"fields"=>array(
			"a.serial"
			,"a.nro_control"
			,"a.nombre"
			,"a.id_modelo"
			,"b.modelo as modelo"
			,"a.id_billetero"
			,"c.tipo as billetero"
			,"a.id_juego"
			,"d.nombre as juego"
			,"a.s_tarjetas"
			,"e.tarjeta as tarjeta"
			,"a.rif_principal"
			,"f.nombre as casino"
			,"a.status"
			,"a.comentario"
			,"fllegada"
			,"f_salida"
			
		)
		,"buscar"=>array(
			"a.serial"
			,"a.nro_control"
			,"a.nombre"
			,"a.id_modelo"
			,"b.modelo"
			,"a.id_billetero"
			,"c.tipo"
			,"a.id_juego"
			,"d.nombre"
			,"a.s_tarjetas"
			,"e.tarjeta"
			,"a.rif_principal"
			,"f.nombre"
			,"a.status"
			,"a.comentario"
			,"a.fllegada"
			,"a.f_salida"
			
		)
	)
	
	
	);


// create PDO object and execute command
$osql = new csql();
$_REQUEST["cmd"]($osql);

// command processors
// {{{
/**
  * getData: Outputs data to client
  *
  * @author    Ing. Jozef Sakáloš <jsakalos@aariadne.com>
  * @date      31. March 2008
  * @return    void
  * @param     PDO $osql
  */
function getData($osql) {
	global $objects;
	
	$params = $objects[$_REQUEST["objName"]];
	
	$params["start"] = isset($_REQUEST["start"]) ? $_REQUEST["start"] : null;
	$params["limit"] = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : null;
	$params["search"] = isset($_REQUEST["fields"]) ? json_decode($_REQUEST["fields"]) : null;
	$params["query"] = isset($_REQUEST["query"]) ? $_REQUEST["query"] : null;
	$params["sort"] = isset($_REQUEST["sort"]) ? $_REQUEST["sort"] : null;
	$params["dir"] = isset($_REQUEST["dir"]) ? $_REQUEST["dir"] : null;

	// next line necessary for Ext 3 as it doesn't send start currently (27. April 2009)
	$params["start"] = $params["start"] ? $params["start"] : 0;

	$response = array(
		 "success"=>true
		,"total"=>$osql->getCount($params)
		,"rows"=>$osql->getData($params)
	);
	$osql->output($response);

} // eo function getData
// }}}
// {{{
/**
  * saveData: saves data to table
  *
  * @author    Ing. Jozef Sakáloš <jsakalos@aariadne.com>
  * @date      02. April 2008
  * @return    voide
  * @param     PDO $osql
  */
function saveData($osql) {
	global $objects;
	$params = $objects[$_REQUEST["objName"]];
	unset($params["fields"]);
        $params["table"] = $_REQUEST["objName"];
	$params["data"] = json_decode($_REQUEST["data"]);
	
	$osql->output($osql->saveData($params));

} // eo function saveData
// }}}
// }}}
// {{{
/**
  * saveData: saves data to table
  *
  * @author    Ing. Jozef Sakáloš <jsakalos@aariadne.com>
  * @date      02. April 2008
  * @return    voide
  * @param     PDO $osql
  */
function deleteData($osql) {
	//global $objects;
	//$params = $objects[$_REQUEST["objName"]];
	//unset($params["fields"]);
        $tabla = $_REQUEST["objName"];
	$idcampo = $_REQUEST["idName"];
	$datadel= json_decode($_REQUEST["data"]);
	$osql->output($osql->DeleteRecord($datadel,$tabla,$idcampo));

} // eo function saveData

// }}}


// eof
?>
