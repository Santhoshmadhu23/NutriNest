<?php
// Backend/api/subscribe.php
require_once '../utils/cors.php';
require_once '../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Get raw POST data
    $data = json_decode(file_get_contents("php://input"));
    
    if (isset($data->email) && !empty($data->email)) {
        $email = htmlspecialchars(strip_tags($data->email));
        
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            try {
                $database = new Database();
                $db = $database->connect();
                
                $query = "INSERT INTO subscribers (email) VALUES (:email)";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':email', $email);
                
                if ($stmt->execute()) {
                    http_response_code(201);
                    echo json_encode(['message' => 'Successfully subscribed!']);
                } else {
                    http_response_code(500);
                    echo json_encode(['message' => 'Failed to subscribe.']);
                }
            } catch (PDOException $e) {
                // If it's a duplicate entry, we can just say "Already subscribed"
                if ($e->errorInfo[1] == 1062) {
                    http_response_code(200); // OK, but already there
                    echo json_encode(['message' => 'You are already subscribed!']);
                } else {
                    http_response_code(500);
                    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
                }
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid email address.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Email is required.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
