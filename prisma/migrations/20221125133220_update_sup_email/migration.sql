/*
  Warnings:

  - A unique constraint covering the columns `[supplierEmail]` on the table `supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[supplierId,supplierName,supplierEmail]` on the table `supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[supplierEmail]` on the table `supplier_payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplierEmail` to the `supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierEmail` to the `supplier_payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `supplier_payments` DROP FOREIGN KEY `supplier_payments_supplierId_supplierName_fkey`;

-- DropIndex
DROP INDEX `supplier_supplierId_supplierName_key` ON `supplier`;

-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `supplierEmail` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `supplier_payments` ADD COLUMN `supplierEmail` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `supplier_supplierEmail_key` ON `supplier`(`supplierEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `supplier_supplierId_supplierName_supplierEmail_key` ON `supplier`(`supplierId`, `supplierName`, `supplierEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `supplier_payments_supplierEmail_key` ON `supplier_payments`(`supplierEmail`);

-- AddForeignKey
ALTER TABLE `supplier_payments` ADD CONSTRAINT `supplier_payments_supplierId_supplierName_supplierEmail_fkey` FOREIGN KEY (`supplierId`, `supplierName`, `supplierEmail`) REFERENCES `supplier`(`supplierId`, `supplierName`, `supplierEmail`) ON DELETE RESTRICT ON UPDATE CASCADE;
