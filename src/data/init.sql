drop database magic_post;
CREATE DATABASE magic_post;
use magic_post;
CREATE TABLE status (
    id int PRIMARY KEY AUTO_INCREMENT,
    location_id int NOT NULL,
    package_id int NOT NULL,
    received_date date NOT NULL,
    transported_date date,
    success boolean
);
CREATE TABLE package(
    package_id int PRIMARY KEY AUTO_INCREMENT,
    weight float NOT NULL,
    send_date date NOT NULL,
    type varchar(255) NOT NULL,
    sender_name_location varchar(255) NOT NULL,
    sender_phone_number varchar(255) NOT NULL,
    sender_id int NOT NULL,
    receiver_name_location varchar(255) NOT NULL,
    receiver_id int NOT NULL,
    receiver_phone_number varchar(255)
);
CREATE TABLE post(
    location_id int PRIMARY KEY AUTO_INCREMENT,
    location varchar(255) NOT NULL,
    type varchar(255)
);
CREATE TABLE user(
    user_id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    full_name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    location_id int NOT NULL
);
ALTER TABLE status
ADD CONSTRAINT fk_status_post FOREIGN KEY (location_id) REFERENCES post(location_id) ON
DELETE RESTRICT ON
UPDATE CASCADE;
ALTER TABLE status
ADD CONSTRAINT fk_status_package FOREIGN KEY (package_id) REFERENCES package(package_id) ON
DELETE RESTRICT ON
UPDATE CASCADE;
ALTER TABLE user
ADD CONSTRAINT fk_user_post FOREIGN KEY (location_id) REFERENCES post(location_id) ON
DELETE RESTRICT ON
UPDATE CASCADE;
ALTER TABLE package
ADD CONSTRAINT fk_package_post_1 FOREIGN KEY (sender_id) REFERENCES post(location_id) ON
DELETE RESTRICT ON
UPDATE CASCADE;
ALTER TABLE package
ADD CONSTRAINT fk_package_post_2 FOREIGN KEY (receiver_id) REFERENCES post(location_id) ON
DELETE RESTRICT ON
UPDATE CASCADE;