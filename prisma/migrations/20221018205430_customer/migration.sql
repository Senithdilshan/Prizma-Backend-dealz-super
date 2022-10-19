-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `mobile` INTEGER NOT NULL,
    `loyalty_points` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customer_customer_id_key`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
