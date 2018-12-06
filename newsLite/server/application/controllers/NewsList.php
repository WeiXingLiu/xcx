<?php
    header('Content-type: application/json, char-set=utf-8');

    require_once('Response.php');
    require_once('Mysql.php');

    $db = Mysql::connect('newsList');

    $postData = json_decode(file_get_contents('php://input'), true);

    $isSwiper = $postData['isSwiper'];

    $begin = 0;
    $length = 10;

    if ($isSwiper) {
        $length = 5;
    } else {
        $page = $postData['row'];
        $begin = $page * 10;
    }
    
    $query = mysqli_query($db, "SELECT * FROM newsList LIMIT $begin,$length");

    $result = [];
    while($row = mysqli_fetch_assoc($query)) {
        $result[] = $row;
    }

    $hasMore = count($result) == 10;

    mysqli_close($db);

    Response::listJson(200, '获取成功', $result, $hasMore);
?>