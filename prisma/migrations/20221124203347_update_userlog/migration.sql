/*
  Warnings:

  - Added the required column `name` to the `userlog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLevel` to the `userlog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `userlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userlog` ADD COLUMN `name` VARCHAR(20) NOT NULL,
    ADD COLUMN `userLevel` INTEGER NOT NULL,
    ADD COLUMN `user_id` VARCHAR(20) NOT NULL;
