/*
  Warnings:

  - You are about to drop the column `LOCATION` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `TYPE` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `ROLE` on the `user` table. All the data in the column will be lost.
  - Added the required column `location` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `LOCATION`,
    DROP COLUMN `TYPE`,
    ADD COLUMN `location` VARCHAR(255) NOT NULL,
    ADD COLUMN `type` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `ROLE`,
    ADD COLUMN `role` VARCHAR(255) NOT NULL;
