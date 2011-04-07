<?
// vim: ts=4:sw=4:nu:fdc=4:nospell

require("../classes/csql.php");

if(!isset($_REQUEST["cmd"])) {
	return;
}
if (!isset($_REQUEST["data"])){
$objects = array(
	// {{{
	// company
	
	"maquinas"=>array(
		"table"=>"maquinas where id_modelo='".$_REQUEST["id_modelo"]."' and rif_principal ='".$_REQUEST["id_rif"]."'"
		,"idName"=>"fcontadores"
		,"fields"=>array(
			"serial"
			,"nro_control"
		)
	)
	
	);
}elseif($_REQUEST['data']==1){
	$objects = array(
	
	"contadores"=>array(
		"table"=>"contadores inner join maquinas on contadores.serial_maquinas = maquinas.serial   where serial_maquinas = ANY (select serial from maquinas where id_modelo='".$_REQUEST["id_modelo"]."' and rif_principal ='".$_REQUEST["id_rif"]."')"
		,"idName"=>"fcontadores"
		,"fields"=>array(
			"contadores.*"
			,"serial"
			,"nro_control"
			
		)
	)
	
	);
}
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
	$datadel= json_decode($_REQUEST["data"]);
	$osql->output($osql->DeleteRecord($datadel,$tabla));

} // eo function saveData
// }}}

function generarData($osql){
	$rif = $_REQUEST["rif_data"];
	$inicial = $_REQUEST["f_ini"];
	$final = $_REQUEST["f_fin"];
	osql->output($osql->GenerarContadores($rif,$inicial,$final));
}

// eof
?>
