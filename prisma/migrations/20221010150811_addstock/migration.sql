-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grnID` VARCHAR(20) NOT NULL,
    `productId` VARCHAR(20) NOT NULL,
    `warehouseID` VARCHAR(20) NOT NULL,
    `batchNo` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `buyingPrice` DOUBLE NOT NULL,
    `sellingPrice` DOUBLE NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Stock_grnID_key`(`grnID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_warehouseID_fkey` FOREIGN KEY (`warehouseID`) REFERENCES `warehouse`(`warehouseID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_batchNo_fkey` FOREIGN KEY (`batchNo`) REFERENCES `batchNo`(`batchNo`) ON DELETE RESTRICT ON UPDATE CASCADE;
