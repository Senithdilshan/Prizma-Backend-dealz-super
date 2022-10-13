-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(20) NOT NULL,
    `barcode` VARCHAR(50) NOT NULL,
    `productName` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `product_productId_key`(`productId`),
    UNIQUE INDEX `product_barcode_key`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warehouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `warehouseID` VARCHAR(20) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',

    UNIQUE INDEX `warehouse_warehouseID_key`(`warehouseID`),
    UNIQUE INDEX `warehouse_location_key`(`location`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
