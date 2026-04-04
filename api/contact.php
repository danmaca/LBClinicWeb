<?php
// Nastavit UTF-8 kódování
ini_set('default_charset', 'UTF-8');
set_time_limit(15);

require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *"); // Restrict to lbclinic.cz in production
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        if (strpos($line, '=') !== false) {
            putenv(trim($line));
            error_log("Loaded env: $line");
        }
    }
}

$isDebug = getenv('IS_DEBUG') === 'true';

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

if (count($requests) >= ($isDebug ? 60 : 5)) {
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

// 5. Send email using PHPMailer

$config = require __DIR__ . '/config/mail.php';

$mail = new \PHPMailer\PHPMailer\PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';                              // Nastavit UTF-8 kódování
    $mail->Encoding = 'base64';                            // Kódovat obsah v base64
    $mail->Timeout = 5;                                    // Kratší timeout (5 sekund)
    $mail->SMTPKeepAlive = false;                          // Neudržuj připojení
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_password'];
    $mail->SMTPSecure = $config['smtp_secure'] === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $config['smtp_port'];
    $mail->XMailer = ' ';                    // skryje "PHPMailer" z hlaviček
    $mail->MessageID = sprintf(
        '<%s@%s>',
        bin2hex(random_bytes(16)),
        $config['from_domain']
    );
    if ($isDebug) {}
        $mail->SMTPDebug = 2;      // vypíše co se děje
        $mail->Debugoutput = function($str, $level) {
            error_log("SMTP: $str");
        };
    }

    // Recipients
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->Sender = $config['from_email'];   // nastaví Return-Path
    $mail->addAddress($config['to_email']);
    $mail->addReplyTo($email, $name);

    // Content
    $subject = "Nová objednávka z webu LB Clinic – $name – $reasonText";
    $mail->isHTML(false);                                  // Nastavit na plain text
    $mail->Subject = $subject;

    // Plain text body
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

    $mail->Body = $mailBody;

    // Send email
    $mail->send();
    
    echo json_encode(["status" => "success", "message" => "Zpráva byla úspěšně odeslána."]);
    exit;
} catch (Exception $e) {
    http_response_code(500);
    error_log("SMTP configuration: Host={$config['smtp_host']}, Port={$config['smtp_port']}, User={$config['smtp_user']}, Secure={$config['smtp_secure']}");
    echo json_encode([
        "status" => "error",
        "message" => "Chyba při odesílání: " . $mail->ErrorInfo
    ]);
    exit;
}