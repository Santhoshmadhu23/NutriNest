<?php
// Backend/api/cart.php
require_once '../utils/cors.php';
require_once '../config/db.php';

header('Content-Type: application/json');

$database = new Database();
$db = $database->connect();

$method = $_SERVER['REQUEST_METHOD'];

/*
This API expects a 'session_id' in the JSON body or Headers. Let's use body for simpler client logic.
For guest users, frontend generates a uuid and stores it in localStorage.
*/

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->action)) {
        http_response_code(400);
        die(json_encode(['message' => 'Missing action parameter (add/remove/sync)']));
    }
    
    if (!isset($data->session_id)) {
        http_response_code(400);
        die(json_encode(['message' => 'Missing session_id']));
    }

    $session_id = $data->session_id;

    if ($data->action === 'sync') {
        // Endpoint to allow frontend to dump localStorage cart into DB for persistence before checkout
        if (isset($data->cart_items) && is_array($data->cart_items)) {
            // clear existing items for this session
            $delQuery = 'DELETE FROM weekly_box WHERE session_id = :session_id';
            $delStmt = $db->prepare($delQuery);
            $delStmt->bindParam(':session_id', $session_id);
            $delStmt->execute();

            foreach($data->cart_items as $item) {
                // we need product_id
                $insertQuery = 'INSERT INTO weekly_box (session_id, product_id, size_label, quantity) VALUES (:session, :pid, :size, :qty)';
                $insStmt = $db->prepare($insertQuery);
                $insStmt->bindParam(':session', $session_id);
                $insStmt->bindParam(':pid', $item->id);
                $insStmt->bindParam(':size', $item->size);
                $insStmt->bindParam(':qty', $item->quantity);
                $insStmt->execute();
            }
            
            echo json_encode(['message' => 'Cart synced successfully']);
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Missing cart_items for sync']);
        }
    } else {
       http_response_code(400);
       echo json_encode(['message' => 'Unsupported action']);
    }

} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
