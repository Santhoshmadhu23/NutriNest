<?php
// Backend/api/contact.php
require_once '../utils/cors.php';
require_once '../config/db.php';

header('Content-Type: application/json');

$database = new Database();
$db = $database->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    // Determine if it's a contact generic message or a newsletter signup
    $type = isset($data->type) ? $data->type : 'contact';
    
    if ($type === 'newsletter') {
        if (!isset($data->email) || empty($data->email)) {
            http_response_code(400);
            die(json_encode(['message' => 'Email is required for newsletter']));
        }
        
        $email = htmlspecialchars(strip_tags($data->email));
        
        try {
            $query = 'INSERT INTO newsletter_signups (email) VALUES (:email)';
            $stmt = $db->prepare($query);
            $stmt->bindParam(':email', $email);
            
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(['message' => 'Successfully subscribed to newsletter']);
            }
        } catch(PDOException $e) {
            // Error 23000 is integrity constraint violation (duplicate entry)
            if ($e->getCode() == 23000) {
                http_response_code(409); // Conflict
                echo json_encode(['message' => 'Email is already subscribed']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Subscription failed']);
            }
        }
    } else {
        // Handle generic contact form
        // In a real application, you would send an email here using PHPMailer or mail()
        // and optionally log the message to a database table.
        // For this implementation, we will mock the successful email send.
        
        if (!isset($data->name) || !isset($data->email) || !isset($data->message)) {
             http_response_code(400);
             die(json_encode(['message' => 'Name, email, and message are required']));
        }
        
        // Mock email sending success
        http_response_code(200);
        echo json_encode(['message' => 'Thank you for reaching out. We will get back to you soon.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
