<?
// vim: ts=4:sw=4:nu:fdc=4:nospell

require("../classes/csql.php");

if(!isset($_REQUEST["cmd"])) {
	return;
}

$objectsPlazas = array(
	// {{{
	// company
	
	"Plazas"=>array(
		"table"=>"Plazas"
		,"idName"=>"id"
		,"fields"=>array(
			 "id"
			,"title"
			,"descrip"
			,"color"
			,"hidden"
			
			
		)
	)
	);

$objectsVendedor = array(
	"Vendedores"=>array(
		"table"=>"Vendedores"
		,"idName"=>"id"
		,"fields"=>array(
			 "id"
			,"codigo"
			,"nombre"
			,"apellido"
			,"direccion"
			,"telefono"
			,"email"
			
			
		)
	)

	);

$objectsGuardias = array(
	
	
	"Guardias"=>array(
		"table"=>"Guardias"  
		,"idName"=>"id"
		//,"inner"=>" inner join Plazas on Guardias.id_plazas = Plazas.id "
		,"fields"=>array(
			 "Guardias.id as id"
			,"title as id_plazas" 
			,"Guardias.descrip as descrip"
			,"hora_ini"
			,"hora_fin"
			,"activo"
	 	)
	)
);


// create PDO object and execute command
$osql = new csql();
$_REQUEST["cmd"]($osql);



function generar($osql){
 	
	global $objectsPlazas, $objectsVendedor, $objectGuardias;
	$objName = $objectsVendedor["Vendedores"]["table"];
	$vendedores = getData($osql,$objectsVendedor,$objName);
	var_dump($vendedores["data"][0]->codigo);
}





// command processors
// {{{
/**
  * getData: Outputs data to client
  *
  * @author    Ing. Jozef Sakáloš <jsakalos@aariadne.com>
  * @date      31. March 2008
  * @return    void
  * @param     PDO $osql
  *
  */




function getData($osql,$allObjects,$key) {
	
	$params = $allObjects["$key"];
	$params["start"] = isset($_REQUEST["start"]) ? $_REQUEST["start"] : null;
	$params["limit"] = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : null;
	$params["search"] = isset($_REQUEST["fields"]) ? json_decode($_REQUEST["fields"]) : null;
	$params["query"] = isset($_REQUEST["query"]) ? $_REQUEST["query"] : null;
	$params["sort"] = isset($_REQUEST["sort"]) ? $_REQUEST["sort"] : null;
	$params["dir"] = isset($_REQUEST["dir"]) ? $_REQUEST["dir"] : null;

	// next line necessary for Ext 3 as it doesn't send start currently (27. April 2009)
	$params["start"] = $params["start"] ? $params["start"] : 0;
 //var_dump($params);
	$response = array(
		
		"total"=>$osql->getCount($params)
		,"data"=>$osql->getData($params)
	);
	
	return($response);

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
	//var_dump($params);
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
	global $objects;
	$params = $objects[$_REQUEST["objName"]];
	unset($params["fields"]);
    $datadel= json_decode($_REQUEST["data"]);
	$osql->output($osql->DeleteRecord($params, $datadel));

} // eo function saveData
// }}}


// eof
?>
