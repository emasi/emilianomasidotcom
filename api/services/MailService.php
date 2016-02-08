<?php

function sendMail($senderName, $senderEmail, $message, $recipientName, $recipientEmail, $emailSubject){
	
	$internalServerError = "Internal Server Error";
	
	$success = false;
	// If all values exist, send the email
	if ( $senderName && $senderEmail && $message ) {
		$recipient = $recipientName . " <" . $recipientEmail . ">";
		$headers = "From: " . $senderName . " <" . $senderEmail . ">";
		$success = mail( $recipient, $emailSubject, $message, $headers );
	}
	if($success!= false){
		return array(status => '200', message => "success");
	}else{
		return array(status => '500', message => $this->$internalServerError);
	}
}

?>