-- Quản lý các điểm giao dịch và tập kết
SELECT * FROM post;
-- Quản lý tài khoản trưởng điểm giao dịch và trưởng điểm tập kết
SELECT * FROM user where role = 'HubManager' or role = 'ExchangeManager';
-- Thống kê hàng trên toàn quốc
    -- Thống kê theo ngày/tuần/tháng/quý/năm (send_date)
SELECT * FROM package where DAY(send_date) = DAY(NOW()) and month(send_date) = month(now()) and year(send_date) = year(now());
SELECT * FROM package where WEEK(send_date) = week(now()) and year(send_date) = year(now());
SELECT * FROM package where MONTH(send_date) = MONTH(NOW()) and year(send_date) = year(now());
SELECT * FROM package where quarter(send_date) = quarter(NOW()) and year(send_date) = year(now());
SELECT * FROM package where year(send_date) = year(NOW()) ;

    -- Thống kê hàng nhận theo ngày/tuần/tháng/quý/năm (receive_date)
SELECT * FROM package where DAY(receive_date) = DAY(NOW()) and month(receive_date) = month(now()) and year(receive_date) = year(now());
SELECT * FROM package where WEEK(receive_date) = week(now()) and year(receive_date) = year(now());
SELECT * FROM package where MONTH(receive_date) = MONTH(NOW()) and year(receive_date) = year(now());
SELECT * FROM package where quarter(receive_date) = quarter(NOW()) and year(receive_date) = year(now());
SELECT * FROM package where year(receive_date) = year(NOW()) ;

--  Thống kê hàng gửi, nhận theo điểm tập kết
    -- Thống kê hàng nhận theo ngày/tuần/tháng/quý/năm (receive_date)

SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and DAY(send_date) = DAY(NOW()) and month(send_date) = month(now()) and year(send_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and WEEK(send_date) = week(now()) and year(send_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and MONTH(send_date) = MONTH(NOW()) and year(send_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and quarter(send_date) = quarter(NOW()) and year(send_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and year(send_date) = year(NOW()) ;

SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and DAY(receive_date) = DAY(NOW()) and month(receive_date) = month(now()) and year(receive_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and WEEK(receive_date) = week(now()) and year(receive_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and MONTH(receive_date) = MONTH(NOW()) and year(receive_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and quarter(receive_date) = quarter(NOW()) and year(receive_date) = year(now());
SELECT * FROM package where (select package_id from post where location_id = '${location_id}') and year(receive_date) = year(NOW()) ;
