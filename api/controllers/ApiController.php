<?php

include_once (realpath(__DIR__ . '/../models/TwitterModel.php'));

class ApiController {
	public $model;
	private $constants = array(module => 'module', method => 'method');
	public function __construct() {}
	
	public function invoke() {
		header('Content-type: application/json');
		header('Access-Control-Allow-Origin: http://www.emilianomasi.com');
		header('Access-Control-Allow-Origin: http://emilianomasi.com');
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