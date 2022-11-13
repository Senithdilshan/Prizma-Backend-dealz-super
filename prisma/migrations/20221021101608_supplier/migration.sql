-- CreateTable
CREATE TABLE `supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierId` VARCHAR(20) NOT NULL,
    `supplierName` VARCHAR(150) NOT NULL,
    `supplierAddress` VARCHAR(150) NOT NULL,
    `supplierContactNumber` VARCHAR(20) NOT NULL,
    `outstandingAmount` FLOAT NOT NULL DEFAULT 0,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `supplier_supplierId_key`(`supplierId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
