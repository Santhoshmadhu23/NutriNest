<?php
// Backend/api/products.php
require_once '../utils/cors.php';
require_once '../config/db.php';

header('Content-Type: application/json');

$database = new Database();
$db = $database->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(get_all_products($db)));
    echo json_encode(get_product($db, $id));
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}

function get_all_products($db) {
    $query = 'SELECT * FROM products ORDER BY product_id ASC';
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $products = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Also fetch sizes for this product
        $row['sizes'] = get_product_sizes($db, $row['product_id']);
        array_push($products, $row);
    }
    
    return $products;
}

function get_product($db, $id) {
    $query = 'SELECT * FROM products WHERE product_id = :id LIMIT 1';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        $product['sizes'] = get_product_sizes($db, $product['product_id']);
        return $product;
    } else {
        http_response_code(404);
        return ['message' => 'Product not found'];
    }
}

function get_product_sizes($db, $product_id) {
    $query = 'SELECT size_label, price FROM product_sizes WHERE product_id = :id';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $product_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
