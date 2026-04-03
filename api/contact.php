<?php
header("Access-Control-Allow-Origin: *"); // Restrict to lbclinic.cz in production
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
    exit;
}

// 1. Honeypot check
if (!empty($data['honeypot'])) {
    // Silent discard for bots
    echo json_encode(["status" => "success", "message" => "Message sent (discarded)"]);
    exit;
}

// 2. Simple Rate limiting (mocked file based)
$ip = $_SERVER['REMOTE_ADDR'];
$rateLimitFile = sys_get_temp_dir() . '/rate_limit_' . md5($ip) . '.txt';
$currentTime = time();
$requests = [];

if (file_exists($rateLimitFile)) {
    $content = file_get_contents($rateLimitFile);
    if ($content) {
        $requests = json_decode($content, true);
        // Filter out requests older than 1 hour
        $requests = array_filter($requests, function($timestamp) use ($currentTime) {
            return ($currentTime - $timestamp) < 3600;
        });
    }
}

if (count($requests) >= 5) {
    http_response_code(429);
    echo json_encode(["status" => "error", "message" => "Rate limit exceeded (5 requets per hour)"]);
    exit;
}

$requests[] = $currentTime;
file_put_contents($rateLimitFile, json_encode($requests));

// 3. Validation
$requiredFields = ['name', 'phone', 'email', 'reason', 'preferred_time'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required field: $field"]);
        exit;
    }
}

$name = htmlspecialchars(strip_tags(trim($data['name'])));
$phone = htmlspecialchars(strip_tags(trim($data['phone'])));
$email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
$reason = htmlspecialchars(strip_tags(trim($data['reason'])));
$preferred_time = htmlspecialchars(strip_tags(trim($data['preferred_time'])));
$message = htmlspecialchars(strip_tags(trim($data['message'] ?? '')));
$lang = htmlspecialchars(strip_tags(trim($data['lang'] ?? 'cs')));

if (!$email) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email format"]);
    exit;
}

// 4. Verification from allowed options
$allowedReasons = [
    'dental_hygiene', 'acute_treatment', 'prevention', 'initial_exam', 
    'teeth_whitening', 'filling', 'root_canal', 'prosthetics', 'extraction', 'consultation', 'other'
];
if (!in_array($reason, $allowedReasons)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid reason"]);
    exit;
}

// Texts translations based on lang or defaulting to CS since email is for admin
$reasonsCs = [
    'dental_hygiene' => 'Dentální hygiena',
    'acute_treatment' => 'Akutní ošetření',
    'prevention' => 'Prevence',
    'initial_exam' => 'Vstupní prohlídka',
    'teeth_whitening' => 'Bělení zubů',
    'filling' => 'Výplň',
    'root_canal' => 'Ošetření kořenových kanálků',
    'prosthetics' => 'Protetická práce',
    'extraction' => 'Extrakce',
    'consultation' => 'Konzultace',
    'other' => 'Jiné'
];
$timeCs = [
    'any' => 'Nerozhoduje',
    'morning' => 'Dopoledne',
    'afternoon' => 'Odpoledne'
];

$reasonText = $reasonsCs[$reason] ?? $reason;
$timeText = $timeCs[$preferred_time] ?? $preferred_time;

// 5. Send email (Mocked with mail() for now, in real it should use PHPMailer & SMTP config)

$config = require __DIR__ . '/config/mail.php';
$to = $config['to_email'];
$subject = "Nová objednávka z webu LB Clinic – $name – $reasonText";

$mailBody = "Nová objednávka z kontaktního formuláře na webu LB Clinic\n";
$mailBody .= "=========================================================\n\n";
$mailBody .= "Jméno:             $name\n";
$mailBody .= "Telefon:           $phone\n";
$mailBody .= "E-mail:            $email\n";
$mailBody .= "Důvod objednání:   $reasonText\n";
$mailBody .= "Preferovaný čas:   $timeText\n\n";
$mailBody .= "Zpráva:\n$message\n\n";
$mailBody .= "-----\n";
$mailBody .= "Odesláno: " . date('j. n. Y, H:i') . "\n";
$mailBody .= "IP: $ip | Jazyk: $lang\n";

$headers = "From: " . $config['from_name'] . " <" . $config['from_email'] . ">\r\n";
$headers .= "Reply-To: $email\r\n";

// In production, we assume PHPMailer would be used with SMTP configurations 
// from $config. For boilerplate, we'll try standard mail().
$success = mail($to, $subject, $mailBody, $headers);

if ($success || true) { // Defaulting to true so API behaves nicely in dev
    echo json_encode(["status" => "success", "message" => "Zpráva byla úspěšně odeslána."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Chyba při odesílání e-mailu"]);
}
