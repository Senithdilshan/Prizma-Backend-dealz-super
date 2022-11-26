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

-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(20) NOT NULL,
    `warehouseID` VARCHAR(20) NOT NULL,
    `batchNo` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `buyingPrice` DOUBLE NOT NULL,
    `sellingPrice` DOUBLE NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Stock_batchNo_key`(`batchNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(20) NOT NULL,
    `barcode` VARCHAR(50) NOT NULL,
    `productName` VARCHAR(150) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `updatedAt` DATETIME(3) NOT NULL,

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
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `warehouse_warehouseID_key`(`warehouseID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `mobile` VARCHAR(14) NOT NULL,
    `loyalty_points` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customer_customer_id_key`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierId` VARCHAR(20) NOT NULL,
    `supplierName` VARCHAR(150) NOT NULL,
    `supplierAddress` VARCHAR(150) NOT NULL,
    `supplierContactNumber` VARCHAR(20) NOT NULL,
    `outstandingAmount` FLOAT NOT NULL DEFAULT 0,
    `supplierEmail` VARCHAR(255) NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `supplier_supplierId_key`(`supplierId`),
    UNIQUE INDEX `supplier_supplierEmail_key`(`supplierEmail`),
    UNIQUE INDEX `supplier_supplierId_supplierName_supplierEmail_key`(`supplierId`, `supplierName`, `supplierEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNumber` VARCHAR(30) NOT NULL,
    `accountName` VARCHAR(50) NOT NULL,
    `bankName` VARCHAR(50) NOT NULL,
    `branchName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `bank_accountNumber_key`(`accountNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentId` VARCHAR(10) NOT NULL,
    `supplierId` VARCHAR(20) NOT NULL,
    `supplierName` VARCHAR(30) NOT NULL,
    `supplierEmail` VARCHAR(255) NOT NULL,
    `paymentDescription` VARCHAR(200) NOT NULL,
    `paymentAmount` DOUBLE NOT NULL,
    `accountNumber` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `supplier_payments_paymentId_key`(`paymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `mobileNo` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `userLevel` INTEGER NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `DOB` DATETIME(3) NOT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_user_id_key`(`user_id`),
    UNIQUE INDEX `user_mobileNo_key`(`mobileNo`),
    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_user_id_email_key`(`user_id`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userlog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `userLevel` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `logTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userreview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leavenote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `date` VARCHAR(30) NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `sale` (
    `saleId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL DEFAULT 0,
    `productId` VARCHAR(20) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `netAmount` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `saleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(10) NOT NULL DEFAULT 'active',

    PRIMARY KEY (`saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `batchNo` ADD CONSTRAINT `batchNo_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_warehouseID_fkey` FOREIGN KEY (`warehouseID`) REFERENCES `warehouse`(`warehouseID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_supplierID_fkey` FOREIGN KEY (`supplierID`) REFERENCES `supplier`(`supplierId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GRN` ADD CONSTRAINT `GRN_batchNo_fkey` FOREIGN KEY (`batchNo`) REFERENCES `batchNo`(`batchNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_warehouseID_fkey` FOREIGN KEY (`warehouseID`) REFERENCES `warehouse`(`warehouseID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_batchNo_fkey` FOREIGN KEY (`batchNo`) REFERENCES `batchNo`(`batchNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_payments` ADD CONSTRAINT `supplier_payments_supplierId_supplierName_supplierEmail_fkey` FOREIGN KEY (`supplierId`, `supplierName`, `supplierEmail`) REFERENCES `supplier`(`supplierId`, `supplierName`, `supplierEmail`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_payments` ADD CONSTRAINT `supplier_payments_accountNumber_fkey` FOREIGN KEY (`accountNumber`) REFERENCES `bank`(`accountNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userlog` ADD CONSTRAINT `userlog_user_id_email_fkey` FOREIGN KEY (`user_id`, `email`) REFERENCES `user`(`user_id`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userreview` ADD CONSTRAINT `userreview_user_id_email_fkey` FOREIGN KEY (`user_id`, `email`) REFERENCES `user`(`user_id`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leavenote` ADD CONSTRAINT `leavenote_user_id_email_fkey` FOREIGN KEY (`user_id`, `email`) REFERENCES `user`(`user_id`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestnote` ADD CONSTRAINT `requestnote_supplierId_supplierName_supplierEmail_fkey` FOREIGN KEY (`supplierId`, `supplierName`, `supplierEmail`) REFERENCES `supplier`(`supplierId`, `supplierName`, `supplierEmail`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestnote` ADD CONSTRAINT `requestnote_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
