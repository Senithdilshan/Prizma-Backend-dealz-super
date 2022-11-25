-- AddForeignKey
ALTER TABLE `userlog` ADD CONSTRAINT `userlog_user_id_email_fkey` FOREIGN KEY (`user_id`, `email`) REFERENCES `user`(`user_id`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;
