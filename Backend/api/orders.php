<?php
// Backend/api/orders.php
require_once '../utils/cors.php';
require_once '../config/db.php';

header('Content-Type: application/json');

$database = new Database();
$db = $database->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Expected to receive order details from frontend checkout
    $data = json_decode(file_get_contents("php://input"));
    
    // Basic validation
    if (!isset($data->cart_items) || empty($data->cart_items) || !isset($data->total_amount)) {
        http_response_code(400);
        die(json_encode(['message' => 'Invalid order data: Missing items or total']));
    }
    
    // Extract guest info
    $guest_name = isset($data->name) ? $data->name : 'Guest';
    $guest_email = isset($data->email) ? $data->email : '';
    $guest_phone = isset($data->phone) ? $data->phone : '';
    $shipping_address = isset($data->address) ? $data->address : '';
    $payment_method = 'Mock Credit Card'; // Based on frontend
    
    try {
        $db->beginTransaction();
        
        // 1. Create Order Record
        $orderQuery = 'INSERT INTO orders 
                       (guest_name, guest_email, guest_phone, total_amount, shipping_address, payment_method, status) 
                       VALUES 
                       (:name, :email, :phone, :total, :address, :payment, "pending")';
                       
        $stmt = $db->prepare($orderQuery);
        $stmt->bindParam(':name', $guest_name);
        $stmt->bindParam(':email', $guest_email);
        $stmt->bindParam(':phone', $guest_phone);
        $stmt->bindParam(':total', $data->total_amount);
        $stmt->bindParam(':address', $shipping_address);
        $stmt->bindParam(':payment', $payment_method);
        
        if ($stmt->execute()) {
            $order_id = $db->lastInsertId();
            
            // 2. Insert Order Items
            $itemQuery = 'INSERT INTO order_items (order_id, product_id, size_label, quantity, price_at_purchase) 
                          VALUES (:order_id, :product_id, :size, :quantity, :price)';
            $itemStmt = $db->prepare($itemQuery);
            
            foreach($data->cart_items as $item) {
                // Ensure product exists
                $pid = $item->id;
                $size = $item->size;
                $qty = $item->quantity;
                $price = $item->price;
                
                $itemStmt->bindParam(':order_id', $order_id);
                $itemStmt->bindParam(':product_id', $pid);
                $itemStmt->bindParam(':size', $size);
                $itemStmt->bindParam(':quantity', $qty);
                $itemStmt->bindParam(':price', $price);
                
                $itemStmt->execute();
            }
            
            // 3. Clear the session cart if requested
            if (isset($data->session_id)) {
                $clearCartQuery = 'DELETE FROM weekly_box WHERE session_id = :session';
                $clearStmt = $db->prepare($clearCartQuery);
                $clearStmt->bindParam(':session', $data->session_id);
                $clearStmt->execute();
            }
            
            $db->commit();
            
            http_response_code(201);
            echo json_encode([
                'message' => 'Order created successfully',
                'order_id' => $order_id,
                'status' => 'pending'
            ]);
            
        } else {
            $db->rollBack();
            http_response_code(500);
            echo json_encode(['message' => 'Failed to create order']);
        }
        
    } catch(PDOException $e) {
        $db->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    }
} else if ($method === 'GET') {
     // Optional: Fetch order by ID for order tracking page
     $order_id = isset($_GET['id']) ? $_GET['id'] : null;
     if ($order_id) {
         $query = 'SELECT order_id, guest_name, total_amount, status, created_at FROM orders WHERE order_id = :id LIMIT 1';
         $stmt = $db->prepare($query);
         $stmt->bindParam(':id', $order_id);
         $stmt->execute();
         
         if ($stmt->rowCount() > 0) {
             echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
         } else {
             http_response_code(404);
             echo json_encode(['message' => 'Order not found']);
         }
     } else {
         http_response_code(400);
         echo json_encode(['message' => 'Order ID is required']);
     }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
