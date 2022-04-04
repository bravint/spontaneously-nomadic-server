/*
  Warnings:

  - The values [APPLE] on the enum `Provider` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `rating` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the `RatingsOnLocations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `locationId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratings` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Provider_new" AS ENUM ('NONE', 'GOOGLE', 'FACEBOOK');
ALTER TABLE "User" ALTER COLUMN "provider" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "provider" TYPE "Provider_new" USING ("provider"::text::"Provider_new");
ALTER TYPE "Provider" RENAME TO "Provider_old";
ALTER TYPE "Provider_new" RENAME TO "Provider";
DROP TYPE "Provider_old";
ALTER TABLE "User" ALTER COLUMN "provider" SET DEFAULT 'NONE';
COMMIT;

-- DropForeignKey
ALTER TABLE "RatingsOnLocations" DROP CONSTRAINT "RatingsOnLocations_locationId_fkey";

-- DropForeignKey
ALTER TABLE "RatingsOnLocations" DROP CONSTRAINT "RatingsOnLocations_ratingId_fkey";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "rating",
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "ratings" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;

-- DropTable
DROP TABLE "RatingsOnLocations";

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
