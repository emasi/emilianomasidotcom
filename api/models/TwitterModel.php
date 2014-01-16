<?php
// require('/services/TwitterService.php');
require_once(realpath(__DIR__ . '/../services/TwitterService.php'));

class TwitterModel {
	private $consumer_key = 'EYnqLmNvT9YPrz8fP1lg';
	private $consumer_secret = 'W79I4RxANYrBX0i2mtlEwxwX8RvykUeGGfClkjStCs';
	
	public function __construct(){}
	
	public function getTweets($getQuery){
		$tweets = get_tweets($this->consumer_key, $this->consumer_secret, $getQuery);
		return $tweets;
	}
}

?>
