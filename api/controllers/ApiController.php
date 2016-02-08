<?php
include_once (realpath(__DIR__ . '/../models/TwitterModel.php'));
include_once (realpath(__DIR__ . '/../models/MailModel.php'));

class ApiController {
	public $model;
	private $ERROR_METHOD_NOT_FOUND = 'Method not found.';
	private $ERROR_BAD_SYNTAX = 'The request cannot be fulfilled due to bad syntax.';
	private $constants = array(module => 'module', method => 'method');
	private $allowedOrigins = array("http://www.emilianomasi.com","http://emilianomasi.com", "http://emilianoemariasposi.emilianomasi.com", "http://emilianoandmariawedding.emilianomasi.com", "http://www.emilianoemariasposi.emilianomasi.com", "http://www.emilianoandmariawedding.emilianomasi.com");
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
					return;
				}
			}else if($_GET [$this->constants[module]] == "mail"){
				if($_GET [$this->constants[method]] == "wedding-rsvp"){
					$this->model = new MailModel();
					echo json_encode($this->model->buildAndSendWeddingMail($_POST));
					return;
				}
			}
			$error = array(status => '404', message => $this->$ERROR_METHOD_NOT_FOUND);
			echo json_encode($error);
		} else {
			$error = array(status => '400', message => $this->$ERROR_BAD_SYNTAX);
			echo json_encode($error);
		}
	}
}

?>