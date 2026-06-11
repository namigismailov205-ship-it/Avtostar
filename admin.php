<?php
$pdo = new PDO("mysql:host=localhost;dbname=avtostar_db;charset=utf8mb4", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Получаем все заказы
$orders = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC")->fetchAll();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Заказы Avtostar</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        h1 { color: #1d3557; }
        table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; vertical-align: top; }
        th { background: #1d3557; color: white; }
        tr:hover { background: #f9f9f9; }
        .order-items { font-size: 14px; }
        .total { font-weight: bold; color: #e63946; }
    </style>
</head>
<body>
    <h1>📦 Заказы Avtostar</h1>
    <table>
        <tr>
            <th>№ заказа</th>
            <th>Дата и время</th>
            <th>Состав заказа</th>
            <th>Сумма</th>
        </tr>
        <?php foreach ($orders as $order): 
            $items = json_decode($order['order_data'], true);
        ?>
        <tr>
            <td><?= $order['id'] ?></td>
            <td><?= date('d.m.Y H:i', strtotime($order['created_at'])) ?></td>
            <td class="order-items">
                <?php foreach ($items as $item): ?>
                    • <?= $item['name'] ?> — <?= $item['quantity'] ?> шт. = <?= $item['price'] * $item['quantity'] ?> ₽<br>
                <?php endforeach; ?>
            </td>
            <td class="total"><?= number_format($order['total'], 0, '', ' ') ?> ₽</td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>