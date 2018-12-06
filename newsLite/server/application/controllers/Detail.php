<?php
    header('Content-type: application/json, cahr-set=utf-8');

    require_once('Mysql.php');
    require_once('Response.php');

    $db = Mysql::connect('newsList');

    $postData = json_decode(file_get_contents('php://input'), true);

    $newsId = $postData['newsId'];

    $sql = "SELECT * FROM newsList WHERE newsId = $newsId";

    $result = mysqli_query($db, $sql);

    $detail = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $detail[] = $row;
    }
    mysqli_close($db);

    $code = '200';
    $msg = '获取成功';

    if (!$result) {
        $code = '201';
        $msg = '获取失败';
    }

    Response::json($code, $msg, $detail[0]);
?>