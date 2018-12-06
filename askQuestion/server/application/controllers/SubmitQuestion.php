
<?php
    header('Content-type:applicatio/json, charset=utf-8');

    require_once('Mysql.php');
    require_once('Response.php');


    $db = Mysql::connect('questions');
    mysqli_set_charset($db, 'utf8mb4');
    $postData = json_decode(file_get_contents('php://input'), true);

    $title = $postData['title'];
    $asker = $postData['asker'];
    $askDate = $postData['askDate'];
    $photoUrls = $postData['photoUrls'];

    $sql = "INSERT INTO questions (title, asker, askDate, photoUrls) VALUES ('$title', '$asker', '$askDate', '$photoUrls')";
    $result = mysqli_query($db, $sql);
    mysqli_close($db);

    Response::json($result ? 200 : 201, $result ? '发布成功' : '发布失败', '');
?>