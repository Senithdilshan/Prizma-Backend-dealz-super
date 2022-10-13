/*
  Warnings:

  - You are about to drop the column `grnID` on the `stock` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Stock_grnID_key` ON `stock`;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `grnID`;
