<?php
    header('Content-type: application/json; cahr-set=utf-8');

    require_once('Mysql.php');
    require_once('Response.php');

    $db = Mysql::connect('liekList');

    $postData = json_decode(file_get_contents('php://input'), true);

    $id = $postData['id'];
    
    $sql = "SELECT * FROM likeList WHERE questionId = $id";

    $sqlResult = mysqli_query($db, $sql);

    $result = mysqli_fetch_assoc($sqlResult);

    $likeId = $result['likeId'];

    if ($result) {
        $updateSql = "DELETE FROM likeList WHERE likeId = $likeId";
        $udateResult = mysqli_query($db, $updateSql);    
    } else {
        $insertSql = "INSERT INTO likeList (questionId, liker) VALUES ($id, '123')";
        $insertSqlResult = mysqli_query($db, $insertSql);    
    }

    $likeCountSql = "SELECT * FROM likeList WHERE questionId = $id";
    $likeCountSqlResult = mysqli_query($db, $likeCountSql);

    $likeCountResult = [];
    while ($row = mysqli_fetch_assoc($likeCountSqlResult)) {
        $likeCountResult[] = $row;
    }

    $data['likeStatus'] = 0;
    for ($x = 0; $x < count($likeCountResult); $x++) {
        $item = $likeCountResult[$x];
        if ($item['liker'] == '123') {
            $data['likeStatus'] = 1;
        }
    }
    mysqli_close($db);

    $code = '200';
    $msg = '操作成功';
    $data['likeCount'] = count($likeCountResult);
    if (!$result) {
        $code = '201';
        $msg = '操作失败';  
    }
    Response::json('200', 'success', $data)
?>