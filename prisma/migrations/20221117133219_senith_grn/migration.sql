-- CreateTable
CREATE TABLE `GRN` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grnID` VARCHAR(20) NOT NULL,
    `productId` VARCHAR(20) NOT NULL,
    `warehouseID` VARCHAR(20) NOT NULL,
    `supplierID` VARCHAR(20) NOT NULL,
    `batchNo` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalBuyingPrice` DOUBLE NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GRN_grnID_key`(`grnID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_warehouseID_fkey` FOREIGN KEY (`warehouseID`) REFERENCES `warehouse`(`warehouseID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_supplierID_fkey` FOREIGN KEY (`supplierID`) REFERENCES `supplier`(`supplierId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_batchNo_fkey` FOREIGN KEY (`batchNo`) REFERENCES `batchNo`(`batchNo`) ON DELETE RESTRICT ON UPDATE CASCADE;
