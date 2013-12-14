<?php

include_once (realpath(__DIR__ . '/../models/TwitterModel.php'));

class ApiController {
	public $model;
	private $constants = array(module => 'module', method => 'method');
	public function __construct() {}
	
	public function invoke() {
		if (isset ( $_GET [$this->constants[module]] )) {
			if($_GET [$this->constants[module]] == "twitter"){
				
				if($_GET [$this->constants[method]] == "tweets"){
					$this->model = new TwitterModel();
					$tweets = $this->model->getTweets($_GET);
					echo $tweets;
				}
				
			}
		} else {
			$error = array(status => '404', message => 'OPS!The request cannot be fulfilled due to bad syntax.');
			echo json_encode($error);
		}
	}
}

?>