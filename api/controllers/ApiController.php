<?php

include_once ("model/TwitterModel.php");

class ApiController {
	public $model;
	public function __construct() {}
	
	public function invoke() {
		if (isset ( $_GET ['module'] )) {
			if($_GET ['module'] == "twitter"){
				$this->model = new TwitterModel();
				$tweets = $this->model->getTweets('10');
				echo $tweets;
			}
		} else {
			header("HTTP/1.1 400 Bad Request");
			echo 'OPS!The request cannot be fulfilled due to bad syntax.';
		}
	}
}

?>