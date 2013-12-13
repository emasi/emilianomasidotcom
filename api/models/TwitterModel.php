<?php
require('../services/TwitterService.php');

class Twitter {
	private $consumer_key = 'xxx';
	private $consumer_secret = 'xxx';
	private $handler = 'xxx';
	
	public function __construct(){}
	
	public function getTweets($count){
		$tweets = get_tweets($consumer_key, $consumer_secret, $this->$handler, $count);
		return $tweets;
	}
}

?>
