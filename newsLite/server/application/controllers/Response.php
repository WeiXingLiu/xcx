<?php
    class Response {
        public static function json($code, $msg, $data) {
            if (!$code) {
                return json_decode('{}');
            }
            $result = array(
                'code' => $code,
                'msg' => $msg,
                'data' => $data
                );
            echo json_encode($result);
            exit();
        }

        public static function listJson($code, $msg, $list, $hasMore) {
            if (!$code) {
                return json_decode('{}');
            }
            $result = array(
                'code' => $code,
                'msg' => $msg,
                'data' => array(
                    'list' => $list,
                    'hasMore' => $hasMore
                    )
                );
            echo json_encode($result);
            exit();
        }
    }
?>