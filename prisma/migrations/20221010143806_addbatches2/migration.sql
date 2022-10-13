/*
  Warnings:

  - You are about to drop the `batcheno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `batcheno` DROP FOREIGN KEY `batcheNo_productId_fkey`;

-- DropTable
DROP TABLE `batcheno`;

-- CreateTable
CREATE TABLE `batchNo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(20) NOT NULL,
    `batchNo` VARCHAR(255) NOT NULL,
    `ManufacturerBNo` VARCHAR(255) NOT NULL,
    `mfDate` DATETIME(3) NOT NULL,
    `exDate` DATETIME(3) NOT NULL,
    `buyingPrice` DOUBLE NOT NULL,
    `sellingPrice` DOUBLE NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `batchNo_batchNo_key`(`batchNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `batchNo` ADD CONSTRAINT `batchNo_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
