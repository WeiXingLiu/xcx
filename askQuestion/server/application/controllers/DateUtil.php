<?php
    class DateUtil {
        public static function distanceDate($date) {
            $year = intval($date / 365 / 24 / 60 / 60);
            if ($year) {
                return "{$year}年前";
            }

            $month = intval($date / 30 / 24 / 60 / 60);
            if ($month) {
                return "{$month}月前";
            }

            $day = intval($date / 24 / 60 / 60);
            if ($day) {
                return "{$day}天前";
            }

            $hour = intval($date / 60 / 60);
            if ($hour) {
                return "{$hour}小时前";
            }

            $min = intval($date / 60);
            if ($min) {
                return "{$min}分钟前";
            }

            $seconds = intval($date);
            if ($seconds) {
                return "{$seconds}秒前";
            }

            return "刚刚";
        }
    }
?>