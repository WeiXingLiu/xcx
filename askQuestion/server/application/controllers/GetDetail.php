<?php
        header('Content-type: application/json; char-set=utf-8');

        require_once('Mysql.php');
        require_once('Response.php');
    
        $db = Mysql::connect('questions');
    
        $postData = json_decode(file_get_contents('php://input'), true);
        $id = $postData['id'];
        //查询详情
        $sql = "SELECT * FROM questions WHERE id = $id";
        $sqlResult = mysqli_query($db, $sql);
        $result = mysqli_fetch_assoc($sqlResult);
        
        //查询是否点赞
        //查询点赞总数
        $questionId = $result['id'];
        $likeCountResult = [];
        $likeCountSql = "SELECT * FROM likeList WHERE questionId = $questionId";
        $likeCountSqlResult = mysqli_query($db, $likeCountSql);
        while ($row = mysqli_fetch_assoc($likeCountSqlResult)) {
            $likeCountResult[] = $row;
        }

        $result['likeStatus'] = 0;
        for ($x = 0; $x < count($likeCountResult); $x++) {
            $item = $likeCountResult[$x];
            if ($item['liker'] == '123') {
                $result['likeStatus'] = 1;
            }
        }

        $result['likeCount'] = count($likeCountResult);
        mysqli_close($db);
        $code = '200';
        $msg = '获取成功';
        if (!$result) {
            $code = '201';
            $msg = '获取失败';
            $result = '{}';
        }

        Response::json($code, $msg, $result);
?>