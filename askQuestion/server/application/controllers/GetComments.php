<?php
    header('Content-type: application/json; char-set=utf-8');

    require_once('Mysql.php');
    require_once('Response.php');
    require_once('DateUtil.php');

    $db = Mysql::connect('commentsList');

    $postData = json_decode(file_get_contents('php://input'), true);
    $questionId = $postData['questionId'];
    $currentPage = $postData['row'];
    $begin = $currentPage * 10;

    $commentsSql = "SELECT comment,commentDate,commentId,commenter,questionId FROM commentsList WHERE questionId = $questionId ORDER BY commentDate desc LIMIT $begin,10";
    $commentsSqlResult = mysqli_query($db, $commentsSql);
    $commentsResult = [];
    while ($row = mysqli_fetch_assoc($commentsSqlResult)) {
        $current = time();
        $seconds = $current - $row['commentDate'];
        $row['commentDate'] = DateUtil::distanceDate($seconds);
        $commentsResult[] = $row;
    }
    $code = '200';
    $msg = '获取成功';

    if (!$commentsSqlResult) {
        $code = '201';
        $msg = '获取失败';    
    }

    Response::listJson($code, $msg, $commentsResult, count($commentsResult) == 10);
?>