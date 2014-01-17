<?php
include_once (realpath(__DIR__ . '/../models/TwitterModel.php'));

class ApiController {
	public $model;
	private $constants = array(module => 'module', method => 'method');
	private $allowedOrigins = array("http://www.emilianomasi.com","http://emilianomasi.com");
	public function __construct() {}
	
	private function checkCORs(){
		if(in_array($_SERVER['HTTP_ORIGIN'], $this->allowedOrigins)){
			header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
		}
		else{
			$error = array(status => '401', message => "Origin '".$_SERVER['HTTP_ORIGIN']."' is not in the list, and is therefore not allowed access.");
			echo json_encode($error);
			exit();
		}
	}
	
	public function invoke() {
		header('Content-type: application/json');
		$this->checkCORs();
		if (isset ( $_GET [$this->constants[module]] )) {
			if($_GET [$this->constants[module]] == "twitter"){
				if($_GET [$this->constants[method]] == "tweets"){
					$this->model = new TwitterModel();
					$tweets = $this->model->getTweets($_GET);
					echo $tweets;
				}else{
					$error = array(status => '404', message => 'Method not found.');
					echo json_encode($error);
				}
				
			}else{
				$error = array(status => '404', message => 'Module not found.');
				echo json_encode($error);
			}
		} else {
			$error = array(status => '400', message => 'The request cannot be fulfilled due to bad syntax.');
			echo json_encode($error);
		}
	}
}

?>