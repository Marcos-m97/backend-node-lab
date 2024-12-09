/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Certificate` DROP FOREIGN KEY `Certificate_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_instructor_id_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_student_id_fkey`;

-- AlterTable
ALTER TABLE `Certificate` MODIFY `student_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Course` MODIFY `instructor_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Progress` MODIFY `student_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
