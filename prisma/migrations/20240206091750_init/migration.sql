-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_parent_id_fkey`;

-- AlterTable
ALTER TABLE `Category` MODIFY `parent_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
