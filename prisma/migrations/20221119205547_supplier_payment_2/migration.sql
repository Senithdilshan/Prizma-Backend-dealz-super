/*
  Warnings:

  - Added the required column `accountNumber` to the `supplier_payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `supplier_payments` ADD COLUMN `accountNumber` VARCHAR(30) NOT NULL,
    MODIFY `paymentDescription` VARCHAR(200) NOT NULL;

-- AddForeignKey
ALTER TABLE `supplier_payments` ADD CONSTRAINT `supplier_payments_accountNumber_fkey` FOREIGN KEY (`accountNumber`) REFERENCES `bank`(`accountNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
