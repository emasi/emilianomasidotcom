<?php
ob_start("ob_gzhandler");
include_once ("controllers/ApiController.php");

$apiController = new ApiController ();
$apiController->invoke();

?>