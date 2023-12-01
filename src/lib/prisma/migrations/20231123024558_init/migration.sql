-- CreateTable
CREATE TABLE `package` (
    `package_id` INTEGER NOT NULL AUTO_INCREMENT,
    `weight` FLOAT NOT NULL,
    `send_date` DATE NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `sender_name_location` VARCHAR(255) NOT NULL,
    `sender_phone_number` VARCHAR(255) NOT NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_name_location` VARCHAR(255) NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `receiver_phone_number` VARCHAR(255) NULL,

    INDEX `fk_package_post_1`(`sender_id`),
    INDEX `fk_package_post_2`(`receiver_id`),
    PRIMARY KEY (`package_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `LOCATION` VARCHAR(255) NOT NULL,
    `TYPE` VARCHAR(255) NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `received_date` DATE NOT NULL,
    `transported_date` DATE NULL,
    `success` BOOLEAN NULL,

    INDEX `fk_status_package`(`package_id`),
    INDEX `fk_status_post`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `ROLE` VARCHAR(255) NOT NULL,
    `location_id` INTEGER NOT NULL,

    INDEX `fk_user_post`(`location_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `package` ADD CONSTRAINT `fk_package_post_1` FOREIGN KEY (`sender_id`) REFERENCES `post`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package` ADD CONSTRAINT `fk_package_post_2` FOREIGN KEY (`receiver_id`) REFERENCES `post`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `status` ADD CONSTRAINT `fk_status_package` FOREIGN KEY (`package_id`) REFERENCES `package`(`package_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `status` ADD CONSTRAINT `fk_status_post` FOREIGN KEY (`location_id`) REFERENCES `post`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_post` FOREIGN KEY (`location_id`) REFERENCES `post`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
