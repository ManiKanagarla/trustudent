<?php
/**
 * Trustudent — Contact form handler
 * Sends an email to trustudentcerification@gmail.com using PHP mail().
 * Requires a working SMTP/mail transport on the server (e.g. LAMP hosting).
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

function clean($v, $max = 500) {
    $v = is_string($v) ? trim($v) : '';
    $v = strip_tags($v);
    $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);
    return substr($v, 0, $max);
}

$name    = clean($_POST['name']    ?? '', 100);
$email   = clean($_POST['email']   ?? '', 150);
$phone   = clean($_POST['phone']   ?? '', 30);
$subject = clean($_POST['subject'] ?? '', 120);
$message = trim($_POST['message']  ?? '');
$message = substr(strip_tags($message), 0, 2000);

// Validation
$errors = [];
if ($name === '')                                        $errors[] = 'Name is required.';
elseif (!preg_match('/^[A-Za-z\s]+$/', $name))           $errors[] = 'Name should contain letters only.';
if ($email === '')                                        $errors[] = 'Email is required.';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL))       $errors[] = 'Please provide a valid email address.';
if ($phone === '')                                        $errors[] = 'Phone number is required.';
elseif (!preg_match('/^[\d\s+\-()]+$/', $phone))          $errors[] = 'Phone number should contain digits only.';
if ($subject === '')                                      $errors[] = 'Subject is required.';
if ($message === '')                                      $errors[] = 'Message is required.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

$to      = 'info@trustudent.in';
$mailSub = '[Trustudent] ' . $subject;

$host = isset($_SERVER['HTTP_HOST']) ? preg_replace('/[^a-zA-Z0-9\.\-]/', '', $_SERVER['HTTP_HOST']) : 'trustudent.local';
$fromAddress = 'no-reply@' . $host;

$body  = "You have received a new enquiry from the Trustudent website.\n\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Phone:   $phone\n";
$body .= "Subject: $subject\n\n";
$body .= "Message:\n$message\n\n";
$body .= "-- \nSent from Trustudent contact form.\n";

$headers   = [];
$headers[] = 'From: Trustudent Website <' . $fromAddress . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = @mail($to, $mailSub, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thanks! Your message has been sent.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Sorry, the message could not be sent right now. Please email us directly at ' . $to . '.']);
}
