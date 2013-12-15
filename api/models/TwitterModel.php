<?php
// require('/services/TwitterService.php');
require_once(realpath(__DIR__ . '/../services/TwitterService.php'));

class TwitterModel {
	private $consumer_key = 'XXX';
	private $consumer_secret = 'XXX';
	
	public function __construct(){}
	
	public function getTweets($getQuery){
		$tweets = get_tweets($this->consumer_key, $this->consumer_secret, $getQuery);
		return $tweets;
	}
}

?>
