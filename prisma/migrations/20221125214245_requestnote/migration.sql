-- CreateTable
CREATE TABLE `requestnote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requestId` VARCHAR(20) NOT NULL,
    `supplierId` VARCHAR(20) NOT NULL,
    `supplierName` VARCHAR(30) NOT NULL,
    `supplierEmail` VARCHAR(255) NOT NULL,
    `productId` VARCHAR(20) NOT NULL,
    `productName` VARCHAR(150) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `date` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `requestnote_requestId_key`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `requestnote` ADD CONSTRAINT `requestnote_supplierId_supplierName_supplierEmail_fkey` FOREIGN KEY (`supplierId`, `supplierName`, `supplierEmail`) REFERENCES `supplier`(`supplierId`, `supplierName`, `supplierEmail`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestnote` ADD CONSTRAINT `requestnote_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
