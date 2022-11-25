-- CreateTable
CREATE TABLE `leavenote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `date` VARCHAR(30) NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `leavenote` ADD CONSTRAINT `leavenote_user_id_email_fkey` FOREIGN KEY (`user_id`, `email`) REFERENCES `user`(`user_id`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;
