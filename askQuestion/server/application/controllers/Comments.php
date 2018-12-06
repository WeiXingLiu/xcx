<?php
    header('Content-type: application/json, char-set=utf-8');

    require_once('Mysql.php');
    require_once('Response.php');

    $db = Mysql::connect('commentsList');

    $postData = json_decode(file_get_contents('php://input'), true);
    $questionId = $postData['questionId'];
    $comment = $postData['comment'];

    $date = time();
    $sql = "INSERT INTO commentsList (questionId, comment, commentDate, commenter) VALUES ($questionId, '$comment', '$date', '12333')";

    $result = mysqli_query($db, $sql);

    mysqli_close($db);

    $code = '200';
    $msg = '评论成功';
   
    if (!$result) {
        $code = '201';
        $msg = '评论失败';    
    }

    Response::json($code, $msg, $result);
?>