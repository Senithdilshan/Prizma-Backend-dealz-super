-- CreateIndex
CREATE FULLTEXT INDEX `customer_name_email_idx` ON `customer`(`name`, `email`);
-- DropIndex
DROP INDEX `customer_name_email_idx` ON `customer`;
-- AlterTable
ALTER TABLE `customer` MODIFY `mobile` BIGINT NOT NULL;
-- AlterTable
ALTER TABLE `customer` MODIFY `mobile` INTEGER UNSIGNED NOT NULL;
-- AlterTable
ALTER TABLE `customer` MODIFY `mobile` FLOAT NOT NULL;
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `mobile`,
    ADD COLUMN `mobile` VARCHAR(14) NOT NULL;