<?php
    header('Content-type: application/json; char-set=utf-8');

    require_once('Mysql.php');
    require_once('Response.php');

    $db = Mysql::connect('questions');

    $postData = json_decode(file_get_contents('php://input'), true);
    $currentPage = $postData['currentPage'];
    $searchKey = $postData['searchKey'];
    $begin = $currentPage * 10;

    $sqlResult = mysqli_query($db, "SELECT id, title, photoUrls, answerContent, askDate FROM questions WHERE title LIKE '%$searchKey%' OR answerContent LIKE '%$searchKey%' ORDER BY id desc LIMIT $begin,10");
    $result = [];
    while ($row = mysqli_fetch_assoc($sqlResult)) {
        $result[] = $row;
    }
    mysqli_close($db);

    $resultCount = count($result);

    Response::listJson(200, '获取成功', $result, $resultCount == 10);
    ?>
