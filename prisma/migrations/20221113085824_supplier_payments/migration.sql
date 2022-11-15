/*
  Warnings:

  - A unique constraint covering the columns `[supplierId,supplierName]` on the table `supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `supplier_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentId` VARCHAR(10) NOT NULL,
    `supplierId` VARCHAR(20) NOT NULL,
    `supplierName` VARCHAR(30) NOT NULL,
    `paymentDescription` VARCHAR(50) NOT NULL,
    `paymentAmount` DOUBLE NOT NULL,

    UNIQUE INDEX `supplier_payments_paymentId_key`(`paymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `supplier_supplierId_supplierName_key` ON `supplier`(`supplierId`, `supplierName`);

-- AddForeignKey
ALTER TABLE `supplier_payments` ADD CONSTRAINT `supplier_payments_supplierId_supplierName_fkey` FOREIGN KEY (`supplierId`, `supplierName`) REFERENCES `supplier`(`supplierId`, `supplierName`) ON DELETE RESTRICT ON UPDATE CASCADE;
