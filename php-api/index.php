<?php
// require __DIR__ . '/db.php';
// use Google\Cloud\Samples\CloudSQL\MySQL\DatabaseTcp;
// // Database configuration
// $db_host = '35.224.82.216';
// $db_name = 'ecommerce';
// $db_user = 'test';
// $db_pass = 'test';

// Set header for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// If it's an OPTIONS request, exit early
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$db   = getenv('DB_NAME');

// This is the full path to the Cloud SQL Unix socket
$socket = getenv('DB_SOCKET'); // We'll set this in app.yaml

$dsn = "mysql:unix_socket=$socket;dbname=$db;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass);
    // echo "Connected successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

// // Connect to Google Cloud MySQL
// $pdo = DatabaseTcp::initTcpDatabaseConnection();

// Simple router for GET /users
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($method === 'GET' && $path === '/users') {
    try {
        $stmt = $pdo->query('SELECT * FROM user');
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch users: ' . $e->getMessage()]);
    }
} else if ($method === 'GET' && $path === '/products') {
    try {
        // Get query parameters
        $categoryId = isset($_GET['categoryId']) ? $_GET['categoryId'] : null;

        if ($categoryId !== null) {
            // If categoryId is provided, filter products by category
            $stmt = $pdo->prepare('SELECT * FROM product WHERE categoryId = :categoryId');
            $stmt->execute(['categoryId' => $categoryId]);
        } else {
            // If categoryId is not provided, return all products or apply other logic
            $stmt = $pdo->query('SELECT * FROM product WHERE isFeatured = 1');
        }

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // $stmt = $pdo->query('SELECT * FROM product');
        // $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch products: ' . $e->getMessage()]);
    }
} else if ($method === 'POST' && $path === '/login') { 
    // Get the POST body
    $input = json_decode(file_get_contents('php://input'), true);
    $username = isset($input['username']) ? $input['username'] : null;
    $password = isset($input['password']) ? $input['password'] : null;

    if (!$username || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and password are required.']);
        return;
    }

    try {
        $stmt = $pdo->prepare('SELECT * FROM user WHERE email = :username AND pw = :password');
        $stmt->execute(['username' => $username, 'password' => $password]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid username or password.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Login failed: ' . $e->getMessage()]);
    }
} else if ($method === 'POST' && $path === '/updateUserRole') {
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = isset($input['userId']) ? $input['userId'] : null;
        $role = isset($input['role']) ? $input['role'] : null;

        if (!$userId || !$role) {
            http_response_code(400);
            echo json_encode(['error' => 'userId and role are required.']);
            return;
        }

        try {
            $stmt = $pdo->prepare('UPDATE user SET role = :role WHERE id = :userId');
            $stmt->execute(['role' => $role, 'userId' => $userId]);
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'User role updated successfully.']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found or role unchanged.']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update user role: ' . $e->getMessage()]);
        }
        } else if ($method === 'GET' && $path === '/sales') {
            $month = isset($_GET['month']) ? $_GET['month'] : null;

            if (!$month || !is_numeric($month) || $month < 0 || $month > 12) {
                http_response_code(400);
                echo json_encode(['error' => 'Valid month parameter is required (1-12).']);
                return;
            }

            // Pad month to two digits
            $monthPadded = str_pad($month, 2, '0', STR_PAD_LEFT);

            try {
                $stmt = $pdo->prepare("SELECT * FROM sales WHERE dateSold LIKE :datePattern");
                $datePattern = "2024-$monthPadded-%";
                $stmt->execute(['datePattern' => $datePattern]);
                $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($sales);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to fetch sales: ' . $e->getMessage()]);
            }
            } else if ($method === 'GET' && $path === '/categories') {
                try {
                    $stmt = $pdo->query('SELECT * FROM category');
                    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($categories);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to fetch categories: ' . $e->getMessage()]);
                }
                } else if ($method === 'POST' && $path === '/addProduct') {
                    $input = json_decode(file_get_contents('php://input'), true);
                    $name = isset($input['name']) ? $input['name'] : null;
                    $price = isset($input['price']) ? $input['price'] : null;
                    $categoryId = isset($input['categoryId']) ? $input['categoryId'] : null;
                    $isFeatured = isset($input['isFeatured']) ? $input['isFeatured'] : 0;
                    $quantity = isset($input['quantity']) ? $input['quantity'] : 0;
                    $img_url = isset($input['imageUrl']) ? $input['imageUrl'] : null;

                    if (!$name || !$price || !$categoryId) {
                        http_response_code(400);
                        echo json_encode(['error' => 'name, price, and categoryId are required.']);
                        return;
                    }

                    try {
                        $stmt = $pdo->prepare('INSERT INTO product (name, price, categoryId, isFeatured, quantity, img_url) VALUES (:name, :price, :categoryId, :isFeatured, :quantity, :img_url)');
                        $stmt->execute([
                            'name' => $name,
                            'price' => $price,
                            'quantity' => $quantity,
                            'categoryId' => $categoryId,
                            'isFeatured' => $isFeatured,
                            'img_url' => $img_url
                        ]);
                        echo json_encode(['success' => true, 'productId' => $pdo->lastInsertId()]);
                    } catch (PDOException $e) {
                        http_response_code(500);
                        echo json_encode(['error' => 'Failed to add product: ' . $e->getMessage()]);
                    }
} else {
    http_response_code(404);
    echo json_encode(['error' => "Endpoint not found: $method $path"]);
}
?>