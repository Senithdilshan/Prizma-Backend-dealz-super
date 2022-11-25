/*
  Warnings:

  - Added the required column `description` to the `userreview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `userreview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userreview` ADD COLUMN `description` VARCHAR(1000) NOT NULL,
    ADD COLUMN `rating` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `userreview` ADD CONSTRAINT `userreview_user_id_email_fkey` FOREIGN KEY (`user_id`, `email`) REFERENCES `user`(`user_id`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;
