/*
  Warnings:

  - You are about to drop the `locationsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "locationsOnUsers" DROP CONSTRAINT "locationsOnUsers_locationId_fkey";

-- DropForeignKey
ALTER TABLE "locationsOnUsers" DROP CONSTRAINT "locationsOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "locationsOnUsers";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
