-- CreateTable
CREATE TABLE `bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNumber` VARCHAR(30) NOT NULL,
    `accountName` VARCHAR(50) NOT NULL,
    `bankName` VARCHAR(50) NOT NULL,
    `branchName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `bank_accountNumber_key`(`accountNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
