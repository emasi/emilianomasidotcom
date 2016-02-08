<?php
require_once(realpath(__DIR__ . '/../services/MailService.php'));

class MailModel {
	
	private $admin_mail = 'info@emilianomasi.com';
	
	
	public function __construct(){}
	
	public function buildAndSendWeddingMail($postParameters){
		$recipientName = "Emiliano Masi";
		$recipientEmail = "masi.emiliano@gmail.com";
		$emailSubject = "wedding-rsvp";
		
		$senderName = isset( $postParameters['guestName'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $postParameters['guestName'] ) : "";
		$senderEmail = "wedding@emilianomasi.com";
		$message = isset( $postParameters['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $postParameters['message'] ) : "";
		return sendMail($senderName, $senderEmail, $message, $recipientName, $recipientEmail, $emailSubject);
	}
}

?>
