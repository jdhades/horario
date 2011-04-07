<?php 

include('conexion.php');
$data = array();
$cmd = isset($_REQUEST['cmd']) ? $_REQUEST['cmd'] : NULL;
	 
    switch($cmd){
		case 'getData':
		 getData();
		 break;
		case NULL:
		 echo 'hay algun problema';
		 break;
	
		}
 
 
function getData(){
	global $conexion;
$sql = "SELECT * FROM principal ORDER BY id_principal LIMIT ".$_REQUEST['start'].", ".$_REQUEST['limit']. "";
$sql2= "SELECT * FROM principal";
$num_result = mysql_query($sql2,$conexion) or die(mysql_error());

$consulta = mysql_query($sql,$conexion) or die(mysql_error());

$totaldata= mysql_num_rows($num_result);
//$result=mysql_fetch_array($consulta);

while ($row= mysql_fetch_object($consulta)){
	$data[]=$row;
	}
echo '({"total":"'.$totaldata.'","results":'.json_encode($data).'})';

};
?>