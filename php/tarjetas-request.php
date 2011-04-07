<?
// vim: ts=4:sw=4:nu:fdc=4:nospell

require("../classes/csql.php");

if(!isset($_REQUEST["cmd"])) {
	return;
}

$objects = array(
	// {{{
	// company
	
	"tarjetas"=>array(
		"table"=>"tarjetas inner join fabricante on tarjetas.id_fabricante=fabricante.id_fabricante"
		,"table1"=>"tarjetas"
		,"idName"=>"serial"
		,"fields"=>array(
			"serial"
			,"nro_parte"
			,"tarjeta"
			,"fabricante.fabricante as id_fabricante"
			,"comentario"
		)
	)
	
	);
	/*,"company"=>array(
		 "table"=>"company"
		,"idName"=>"compID"
		,"fields"=>array(
			 "compID"
			,"company"
			,"price"
			,"change"
			,"pctChange"
			,"lastChange"
			,"industry"
			,"action1"
			,"qtip1"
			,"action2"
			,"qtip2"
			,"action3"
			,"qtip3"
			,"note"
		)
	)
	,"person"=>array(
		"table"=>"person left join phone on person.persID=phone.persID"
		,"idName"=>"persID"
		,"groupBy"=>"person.persID"
		,"fields"=>array(
			  "person.persID"
			 ,"persFirstName"
			 ,"persMidName"
			 ,"persLastName"
			 ,"persNote"
			 ,"group_concat(concat_ws('~',phoneType,phoneNumber),'|') as phones"
		)
	)
	,"person2"=>array(
		"table"=>"person2"
		,"idName"=>"person2.persID"
		,"fields"=>array(
			  "persID"
			 ,"persFirstName"
			 ,"persMidName"
			 ,"persLastName"
		)
	)
	// }}}
);*/

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
	$json_errors = array(
    JSON_ERROR_NONE => 'No error has occurred',
    JSON_ERROR_DEPTH => 'The maximum stack depth has been exceeded',
    JSON_ERROR_CTRL_CHAR => 'Control character error, possibly incorrectly encoded',
    JSON_ERROR_SYNTAX => 'Syntax error',
);

	$params = $objects[$_REQUEST["objName"]];
	unset($params["fields"]);
        $params["table"] = $_REQUEST["objName"]; 
	$arreglo = utf8_encode($_REQUEST["data"]);
	echo '<pre>';
	print_r($arreglo);
	echo '</pre>';
	$params["data"] = json_decode($arreglo,true);
	echo '<pre>';
	print_r($params);
	echo '</pre>';
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
