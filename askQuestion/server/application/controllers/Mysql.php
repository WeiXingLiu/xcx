<?php
    class Mysql {
        public static function connect($tableName) {
            $db = mysqli_connect('localhost', 'root', 'lwx901224.', 'questions');
            if (!$db) {
                connect_error();
                return null;
            }

            mysqli_select_db($db, $tableName);
            mysqli_query($db, "set names 'utf8mb4'");

            return $db;
        }

        public static function connect_error() {
            $json = '{"code": "300","msg": "连接数据库失败"}';
            echo($json);
            exit();
        }
    }
?>