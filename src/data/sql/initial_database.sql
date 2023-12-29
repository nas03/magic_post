CREATE TABLE `Customer` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(191) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Location` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(191) NOT NULL,
	`location` varchar(191) NOT NULL,
	`type` enum('BRANCH', 'TRANSSHIPMENT_HUB') NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `LocationStatistics` (
	`id` int NOT NULL AUTO_INCREMENT,
	`sentCount` int NOT NULL,
	`receivedCount` int NOT NULL,
	`location_id` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `LocationStatistics_location_id_key` (`location_id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Package` (
	`id` int NOT NULL AUTO_INCREMENT,
	`sender` varchar(191) NOT NULL,
	`receiver` varchar(191) NOT NULL,
	`sender_location` varchar(191) NOT NULL,
	`receiver_location` varchar(191) NOT NULL,
	`sender_phone` varchar(191) NOT NULL,
	`receiver_phone` varchar(191) NOT NULL,
	`type` enum('DOCUMENT', 'GOODS') NOT NULL,
	`fee` double NOT NULL,
	`received_location_id` int NOT NULL,
	`state` enum('ONGOING', 'RECEIVED', 'RETURNED') NOT NULL DEFAULT 'ONGOING',
	`destination_location_id` int NOT NULL,
	`shipment_id` int,
	`customerInstruction` enum('CANCEL', 'INSTANT_RETURN', 'RETURN_BEFORE', 'CALL', 'RETURN_AFTER_EXPIRED') NOT NULL DEFAULT 'CALL',
	PRIMARY KEY (`id`),
	UNIQUE KEY `Package_shipment_id_key` (`shipment_id`),
	KEY `Package_received_location_id_idx` (`received_location_id`),
	KEY `Package_destination_location_id_idx` (`destination_location_id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ShipmentLog` (
	`id` int NOT NULL AUTO_INCREMENT,
	`request_timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3),
	`status` enum('ONGOING', 'RECEIVED', 'RETURNED') NOT NULL,
	`location_id` int NOT NULL,
	`package_id` int NOT NULL,
	PRIMARY KEY (`id`),
	KEY `ShipmentLog_location_id_idx` (`location_id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `TransshipmentLog` (
	`id` int NOT NULL AUTO_INCREMENT,
	`request_timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3),
	`verified_timestamp` datetime(3),
	`request_location` int NOT NULL,
	`destination_location` int NOT NULL,
	`location_id` int NOT NULL,
	`package_id` int NOT NULL,
	PRIMARY KEY (`id`),
	KEY `TransitionLog_location_id_idx` (`location_id`),
	KEY `TransitionLog_package_id_idx` (`package_id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;

CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`fullName` varchar(191) NOT NULL,
	`role` enum('LEADER', 'TRANSSHIPMENT_HUB_MANAGER', 'BRANCH_CENTER_MANAGER', 'BRANCH_OFFICER', 'HUB_OFFICER', 'CUSTOMER') NOT NULL,
	`location_id` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `User_email_key` (`email`),
	KEY `User_location_id_idx` (`location_id`),
	KEY `User_id_idx` (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;